<?php

namespace App\Controller;

use App\Repository\AthleteRepository;
use App\Repository\SessionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ApiController extends AbstractController
{
    #[Route('/athlete', name: 'athlete')]
    public function athlete(AthleteRepository $athleteRepository) {
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
            $result[$athletes[$i]->getId()]['picture'] = $athletes[$i]->getPicture();
        }
        return $this->json($result);
    }

    #[Route('/session', name: 'session')]
    public function session(SessionRepository $sessionRepository) {
        $sessions = $sessionRepository->findBy($_GET);
        $result = array();
        for($i = 0; $i < sizeof($sessions); $i++) {
            $result[$sessions[$i]->getId()]['title'] = $sessions[$i]->getTitle();
            $result[$sessions[$i]->getId()]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$sessions[$i]->getId()]['athlete'] = $sessions[$i]->getAthlete()->getId();
            $result[$sessions[$i]->getId()]['current'] = $sessions[$i]->isCurrent();
            $result[$sessions[$i]->getId()]['start'] = $sessions[$i]->getStart();
            $result[$sessions[$i]->getId()]['end'] = $sessions[$i]->getEnd();
        }
        return $this->json($result);
    }
}
