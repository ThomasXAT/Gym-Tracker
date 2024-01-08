<?php

namespace App\Command;

use App\Repository\Training\SetRepository;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'sets:score:update',
    description: 'Update score of all sets',
)]
class SetsScoreUpdateCommand extends Command
{
    private SetRepository $setRepository;

    public function __construct(SetRepository $setRepository)
    {
        parent::__construct();
        $this->setRepository = $setRepository;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $sets = $this->setRepository->findAll();
        foreach ($sets as $set) {
            $set->updateScore();
            $this->setRepository->save($set, true);
        }

        $io->success('Sets score has been successfully updated!');

        return Command::SUCCESS;
    }
}
