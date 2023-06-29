<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Session;
use App\Repository\SessionRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends AbstractController
{
    #[Route('session/start/{title}', name: 'session_start')]
    public function start(string $title, SessionRepository $sessionRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if (!$sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            $session = new Session();
            $session
                ->setTitle($title)
                ->setAthlete($user)
                ->setStart(new DateTime)
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }

    #[Route('session/stop', name: 'session_stop')]
    public function stop(SessionRepository $sessionRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true])) {
            $session
                ->setCurrent(false)
                ->setEnd(new DateTime)
            ;
            $sessionRepository->save($session, true);
        }
        return $this->redirectToRoute('home');
    }
}