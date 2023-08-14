<?php

namespace App\Command;

use App\Entity\Anatomy\Bundle;
use App\Entity\Anatomy\Muscle;
use App\Entity\Anatomy\MuscleGroup;
use App\Repository\Anatomy\BundleRepository;
use App\Repository\Anatomy\MuscleGroupRepository;
use App\Repository\Anatomy\MuscleRepository;
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
    name: 'anatomy:data:import',
    description: 'Import anatomy data from a JSON file',
)]
class AnatomyDataImportCommand extends Command
{
    private BundleRepository $bundleRepository;
    private MuscleGroupRepository $muscleGroupRepository;
    private MuscleRepository $muscleRepository;

    public function __construct(BundleRepository $bundleRepository, MuscleGroupRepository $muscleGroupRepository, MuscleRepository $muscleRepository) 
    {
        parent::__construct();
        $this->bundleRepository = $bundleRepository;
        $this->muscleGroupRepository = $muscleGroupRepository;
        $this->muscleRepository = $muscleRepository;
    }

    protected function configure()
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

                foreach ($data as $muscleGroupData) {

                    if ($muscleGroupData === end($data)) {
                        $current = '└── ';
                        $step1 = '    ';
                    }
                    else {
                        $current = '├── ';
                        $step1 = '│   ';
                    }
                    $io->text($current . $muscleGroupData['name']);
                    sleep($time);

                    $muscleGroup = new MuscleGroup();
                    $muscleGroup->setName($muscleGroupData['name']);
                    if (isset($muscleGroupData['muscles'])) {
                        foreach ($muscleGroupData['muscles'] as $muscleData) {

                            if ($muscleData === end($muscleGroupData['muscles'])) {
                                $current = '└── ';
                                $step2 = '    ';
                            }
                            else {
                                $current = '├── ';
                                $step2 = '│   ';
                            }
                            $io->text($step1 . $current . $muscleData['name']);
                            sleep($time);

                            $muscle = new Muscle();
                            $muscle->setName($muscleData['name']);
                            if (isset($muscleData['bundles'])) {
                                foreach ($muscleData['bundles'] as $bundleData) {

                                    if ($bundleData === end($muscleData['bundles'])) {
                                        $current = '└── ';
                                    }
                                    else {
                                        $current = '├── ';
                                    }
                                    $io->text($step1 . $step2 . $current . $bundleData['name']);
                                    sleep($time);

                                    $bundle = new Bundle();
                                    $bundle->setName($bundleData['name']);
                                    $muscle->addBundle($bundle);
                                    $this->bundleRepository->save($bundle, true);
                                }
                            }
                            $muscleGroup->addMuscle($muscle);
                            $this->muscleRepository->save($muscle, true);
                        }
                    }
                    $this->muscleGroupRepository->save($muscleGroup, true);
                }
            }
            $io->success('Anatomy data has been successfully imported!');
            return Command::SUCCESS;
        } catch (FileNotFoundException $exception) {
            $io->error('Unable to read the JSON file.');
            return Command::FAILURE;
        }
    }
}
