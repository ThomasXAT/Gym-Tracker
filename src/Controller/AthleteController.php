<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Repository\AthleteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AthleteController extends AbstractController
{
    // API

    #[Route('api/athlete', name: 'api_athlete')]
    public function list(AthleteRepository $athleteRepository) {
        $athletes = $athleteRepository->findBy($_GET);
        $result = array();
        for($i = 0; $i < sizeof($athletes); $i++) {
            $result[$athletes[$i]->getId()]['username'] = $athletes[$i]->getUsername();
            $result[$athletes[$i]->getId()]['firstname'] = $athletes[$i]->getFirstname();
            $result[$athletes[$i]->getId()]['surname'] = $athletes[$i]->getSurname();
            $result[$athletes[$i]->getId()]['email'] = $athletes[$i]->getEmail();
            $result[$athletes[$i]->getId()]['description'] = $athletes[$i]->getDescription();
            $result[$athletes[$i]->getId()]['height'] = $athletes[$i]->getHeight();
            $result[$athletes[$i]->getId()]['weight'] = $athletes[$i]->getWeight();
        }
        return $this->json($result);
    }
}