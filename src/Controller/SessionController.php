<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Session;
use App\Repository\AthleteRepository;
use App\Repository\SessionRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{
    #[Route('session/new/{title}', name: 'session_new')]
    public function new(string $title, AthleteRepository $athleteRepository, EntityManagerInterface $entityManager): Response
    {
        $athlete = $this->getUser();
        if (!$athleteRepository->findCurrentSession($athlete)) {
            $session = new Session();
            $session
                ->setTitle($title)
                ->setAthlete($athlete)
                ->setStart(new DateTime)
            ;
            $entityManager->persist($session);
            $entityManager->flush();
        }
        return $this->redirectToRoute('home');
    }

    #[Route('session/list/{username}', name: 'session_list')]
    public function list(string $username, AthleteRepository $athleteRepository, SessionRepository $sessionRepository) {
        $athlete = $athleteRepository->findByUsername($username);
        $sessions = $sessionRepository->findByAthlete($athlete);
        $result = array();
        for($i = 0; $i < sizeof($sessions); $i++) {
            $result[$sessions[$i]->getId()]['title'] = $sessions[$i]->getTitle();
            $result[$sessions[$i]->getId()]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$sessions[$i]->getId()]['start'] = $sessions[$i]->getStart();
        }
        return $this->json($result);
    }
}