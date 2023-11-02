<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Training\Exercice;
use App\Form\ExerciceType;
use App\Form\ProfileType;
use App\Repository\AthleteRepository;
use App\Repository\MeasurementRepository;
use App\Repository\Training\ExerciceRepository;
use App\Repository\Training\SessionRepository;
use App\Repository\Training\SetRepository;
use Imagine\Gd\Imagine;
use Imagine\Image\Box;
use Imagine\Image\Point;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route(path:'/', name: 'home')]
    public function home(AthleteRepository $athleteRepository, SessionRepository $sessionRepository, SetRepository $setRepository, ExerciceRepository $exerciceRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            $session = $sessionRepository->findOneBy(['athlete' => $user, 'current' => true]);
            return $this->render('main/session/index.html.twig', [
                'page' => 'session',
                'session' => $session,
                'exercices' => $exerciceRepository->findAll(),
                'form' => $this->createForm(ExerciceType::class),
                'equipments' => Exercice::EQUIPMENTS,
            ]);
        }
        if (isset($_GET["search"])) {
            $search = $_GET["search"];
            $results = array();
            if ($search) {
                if (substr($search, 0, 1) === '@' && $athlete = $athleteRepository->findOneBy(['username' => substr($search, 1)])) {
                    return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
                }
                else {
                    $results = array_merge(
                        $results,
                        $athleteRepository->findByUsername(str_replace('@', '', $search))
                    );
                    $results = array_merge(
                        $results,
                        $athleteRepository->findByFullname($search)
                    );
                    $results = array_merge(
                        $results,
                        $athleteRepository->findByDescription($search)
                    );  
                    $results = array_unique($results, SORT_REGULAR);
                }
            }
            return $this->render('main/repertory/index.html.twig', [
                'page' => 'repertory',
                'search' => $search,
                'results' => $results,
            ]);
        }
        return $this->render('main/home/index.html.twig', [
            'page' => 'home',
        ]);
    }

    #[Route(path:'/@{username}', name: 'profile')]
    public function profile(Request $request, UserPasswordHasherInterface $userPasswordHasher, AthleteRepository $athleteRepository, SessionRepository $sessionRepository, MeasurementRepository $measurementRepository, String $username): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            return $this->redirectToRoute('home');
        }
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            $params = array();
            $params['page'] = 'profile';
            $params['athlete'] = $athlete;
            $sessions = $sessionRepository->findBy(['athlete' => $athlete, 'current' => false], ['start' => 'desc'], 3);
            $params['sessions'] = $sessions;
            if ($this->getUser() === $athlete) {
                $oldPassword = $athlete->getPassword();
                $form = $this->createForm(ProfileType::class, $athlete);
                $form->handleRequest($request);
                if ($form->isSubmitted() && $form->isValid()) {
                    // Password
                    $newPassword = $form->get('password')->getData();
                    if ($newPassword) {
                        $athlete->setPassword(
                            $userPasswordHasher->hashPassword(
                                $athlete,
                                $newPassword,
                            )
                        );
                    }
                    else {
                        $athlete->setPassword($oldPassword);
                    }

                    // Picture
                    /**
                     * @var UploadedFile $file
                     */
                    $file = $form->get('file')->getData();
                    if ($file) {
                        $public = $this->getParameter('public');
                        $directory = 'images/athletes/' . $athlete->getUsername() . '/picture/';
                        $name = uniqid();
                        $filesystem = new Filesystem();
                        if ($filesystem->exists($public . $directory)) {
                            $filesystem->remove($public . $directory);
                        }
                        try {
                            $file->move($public . $directory, $name);
                            $imagine = new Imagine();
                            $image = $imagine->open($public . $directory . $name);
                            $width = $image->getSize()->getWidth();
                            $height = $image->getSize()->getHeight();
                            $size = min($width, $height);
                            $x = ($width - $size) / 2;
                            $y = ($height - $size) / 2;
                            $image->crop(new Point($x, $y), new Box($size, $size));
                            if ($size > 512) {
                                $image->resize(new Box(512, 512));
                            }
                            $image->save($public . $directory . $name . '.jpg');
                            $athlete->setPicture($directory . $name . '.jpg');
                            if ($filesystem->exists($public . $directory . $name)) {
                                $filesystem->remove($public . $directory . $name);
                            }
                        } catch (FileException $e) {
                        }
                    }
                    elseif (isset($_POST['profile']['_delete_picture']) && $_POST['profile']['_delete_picture']) {
                        $athlete->setPicture(null);
                    }
                    $athleteRepository->save($athlete, true);
                    if ($newPassword) {
                        return $this->redirectToRoute('authentication_logout');
                    }
                    return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
                }
                else {
                    $params['form'] = $form;
                }
            }
            return $this->render('main/profile/index.html.twig', $params);
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }

    #[Route(path:'/@{username}/sessions', name: 'sessions')]
    public function sessions(AthleteRepository $athleteRepository, SessionRepository $sessionRepository, String $username): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            return $this->redirectToRoute('home');
        }
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            $sessions = $sessionRepository->findBy(['athlete' => $athlete], ['start' => 'desc']);
            if ($sessions) {
                return $this->render('main/profile/sessions/index.html.twig', [
                    'page' => 'sessions',
                    'athlete' => $athlete,
                    'sessions' => $sessions,
                ]);
            }
            else {
                return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
            }
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }

    #[Route(path:'/@{username}/sessions/{slug}/{string}', name: 'session_display')]
    public function session_display(AthleteRepository $athleteRepository, SessionRepository $sessionRepository, string $username, string $slug, string $string) {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            return $this->redirectToRoute('home');
        }
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            $session = $sessionRepository->findOneBy(['athlete' => $athlete, 'slug' => $slug, 'string' => $string, 'current' => false]);
            if ($session) {
                $sessions = $sessionRepository->findBy(['athlete' => $athlete]);
                for ($i = 0; $i < sizeof($sessions); $i++) {
                    if ($session->getSlug() === $sessions[$i]->getSlug() && $session->getString() === $sessions[$i]->getString()) {
                        return $this->render('main/session/index.html.twig', [
                            'page' => 'session',
                            'athlete' => $athlete,
                            'session' => $session,
                            'position' => $i + 1,
                        ]);
                    }
                }
            }
            throw new NotFoundHttpException('Session not found. The requested session does not exist.');
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }

    #[Route(path:'/@{username}/measurements', name: 'measurements')]
    public function measurements(AthleteRepository $athleteRepository, MeasurementRepository $measurementRepository, String $username): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($user->isWorkingOut()) {
            return $this->redirectToRoute('home');
        }
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            $measurements = $measurementRepository->findBy(['athlete' => $athlete], ['date' => 'desc']);
            if ($measurements && ($athlete->getSettings()->isMeasurement() || $athlete === $user && $athlete->getHeight() && $athlete->getWeight())) {
                return $this->render('main/profile/measurements/index.html.twig', [
                    'page' => 'measurements',
                    'athlete' => $athlete,
                    'measurements' => $measurements,
                ]);
            }
            else {
                return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
            }
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }
}