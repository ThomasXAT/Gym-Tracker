<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Session;
use App\Repository\AthleteRepository;
use App\Repository\SessionRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{
    #[Route('session/start/{title}', name: 'session_start')]
    public function start(string $title, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        /**
         * @var Athlete $athlete
         */
        $athlete = $this->getUser();
        if (!$sessionRepository->findOneBy(['athlete' => $athlete, 'current' => true])) {
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

    #[Route('session/stop', name: 'session_stop')]
    public function stop(SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        /**
         * @var Athlete $athlete
         */
        $athlete = $this->getUser();
        if ($session = $sessionRepository->findOneBy(['athlete' => $athlete, 'current' => true])) {
            /**
             * @var Session $session
             */
            $session
                ->setCurrent(false)
                ->setEnd(new DateTime)
            ;
            $entityManager->persist($session);
            $entityManager->flush();
        }
        return $this->redirectToRoute('home');
    }

    // AJAX

    #[Route('ajax/session', name: 'ajax_session')]
    public function list(SessionRepository $sessionRepository) {
        $sessions = $sessionRepository->findBy(['current' => false]);
        $result = array();
        for($i = 0; $i < sizeof($sessions); $i++) {
            $result[$sessions[$i]->getId()]['title'] = $sessions[$i]->getTitle();
            $result[$sessions[$i]->getId()]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$sessions[$i]->getId()]['start'] = $sessions[$i]->getStart();
            $result[$sessions[$i]->getId()]['end'] = $sessions[$i]->getEnd();
            $result[$sessions[$i]->getId()]['athlete'] = $sessions[$i]->getAthlete()->getUsername();
        }
        return $this->json($result);
    }

    #[Route('ajax/session/{username}', name: 'ajax_session_athlete')]
    public function listByAthlete(string $username, AthleteRepository $athleteRepository, SessionRepository $sessionRepository) {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        $sessions = $sessionRepository->findBy(['athlete' => $athlete, 'current' => false]);
        $result = array();
        for($i = 0; $i < sizeof($sessions); $i++) {
            $result[$sessions[$i]->getId()]['title'] = $sessions[$i]->getTitle();
            $result[$sessions[$i]->getId()]['subtitle'] = $sessions[$i]->getSubtitle();
            $result[$sessions[$i]->getId()]['start'] = $sessions[$i]->getStart();
            $result[$sessions[$i]->getId()]['end'] = $sessions[$i]->getEnd();
        }
        return $this->json($result);
    }
}