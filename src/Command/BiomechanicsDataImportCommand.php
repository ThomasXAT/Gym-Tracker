<?php

namespace App\Command;

use App\Entity\Biomechanics\Movement;
use App\Repository\Biomechanics\MovementRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\Filesystem\Filesystem;

#[AsCommand(
    name: 'biomechanics:data:import',
    description: 'Import biomechanics data from a JSON file',
)]
class BiomechanicsDataImportCommand extends Command
{
    private MovementRepository $movementRepository;

    public function __construct(MovementRepository $movementRepository) 
    {
        parent::__construct();
        $this->movementRepository = $movementRepository;
    }

    protected function configure(): void
    {
        $this
            ->addOption('file', 'f', InputOption::VALUE_REQUIRED, 'The path to the JSON file')
            ->addOption('slow', 's', InputOption::VALUE_NONE, 'Slow down the execution speed of the command')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $file = $input->getOption('file');
        $slow = $input->getOption('slow');
        $slow ? $time = 1 : $time = 0;
        if (!$file) {
            $io->error('Please specify the path to the JSON file using the --file option.');
            return Command::FAILURE;
        }
        $filesystem = new Filesystem();
        if (!$filesystem->exists($file)) {
            $io->error('The specified file does not exist.');
            return Command::FAILURE;
        }
        try {
            $data = json_decode(file_get_contents($file), true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $io->error('Invalid JSON: ' . json_last_error_msg());
                return Command::FAILURE; 
            }
            if ($data) {

                $io->text($file);
                sleep($time);

                foreach ($data as $jointData) {

                    if ($jointData === end($data)) {
                        $current = '└── ';
                        $step1 = '    ';
                    }
                    else {
                        $current = '├── ';
                        $step1 = '│   ';
                    }
                    $io->text($current . $jointData['name']);
                    sleep($time);

                    if (isset($jointData['movements'])) {
                        foreach ($jointData['movements'] as $movementData) {

                            if ($movementData === end($jointData['movements'])) {
                                $current = '└── ';
                                $step2 = '    ';
                            }
                            else {
                                $current = '├── ';
                                $step2 = '│   ';
                            }
                            $io->text($step1 . $current . $movementData['name'] . ": " . $movementData['description']);
                            sleep($time);

                            $movement = new Movement();
                            $movement->setJoint($jointData['name']);
                            $movement->setName($movementData['name']);
                            $movement->setDescription($movementData['description']);
                            $this->movementRepository->save($movement, true);
                        }
                    }
                }
            }
            $io->success('Biomechanics data has been successfully imported!');
            return Command::SUCCESS;
        } catch (FileNotFoundException $exception) {
            $io->error('Unable to read the JSON file.');
            return Command::FAILURE;
        }
    }
}
