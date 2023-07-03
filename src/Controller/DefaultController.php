<?php

namespace App\Controller;

use App\Entity\Measurement;
use App\Form\ProfileType;
use App\Repository\AthleteRepository;
use App\Repository\MeasurementRepository;
use App\Repository\Training\SessionRepository;
use DateTime;
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
    #[Route('/', name: 'home')]
    public function home(AthleteRepository $athleteRepository): Response
    {
        if (isset($_GET["search"])) {
            $search = $_GET["search"];
            $results = array();
            if ($search) {
                $results = array_merge(
                    $results,
                    $athleteRepository->findByUsername($search)
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

    #[Route('/@{username}', name: 'profile')]
    public function profile(Request $request, UserPasswordHasherInterface $userPasswordHasher, AthleteRepository $athleteRepository, SessionRepository $sessionRepository, MeasurementRepository $measurementRepository, String $username): Response
    {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
            $params = array();
            $params['page'] = 'profile';
            $params['athlete'] = $athlete;
            $sessions = $sessionRepository->findBy(['athlete' => $athlete, 'current' => false], ['start' => 'desc'], 3);
            $params['sessions'] = $sessions;
            if ($oldMeasurement = $measurementRepository->findOneBy(['athlete' => $athlete], ['date' => 'desc'])) {
                $params['height'] = $oldMeasurement->getHeight();
                $params['weight'] = $oldMeasurement->getWeight();
            }
            if ($this->getUser() == $athlete) {
                $oldPassword = $athlete->getPassword();
                $form = $this->createForm(ProfileType::class, $athlete);
                $form->handleRequest($request);
                if ($form->isSubmitted() && $form->isValid()) {
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
                    /**
                     * @var UploadedFile $file
                     */
                    $file = $form->get('file')->getData();
                    if ($file) {
                        $root = $this->getParameter('root');
                        $directory = 'images/athletes/' . $athlete->getUsername() . '/picture/';
                        $name = uniqid();
                        $filesystem = new Filesystem();
                        if ($filesystem->exists($root . $directory)) {
                            $filesystem->remove($root . $directory);
                        }    
                        try {
                            $file->move($root . $directory, $name);
                            $imagine = new Imagine();
                            $image = $imagine->open($root . $directory . $name);
                            $width = $image->getSize()->getWidth();
                            $height = $image->getSize()->getHeight();
                            $size = min($width, $height);
                            $x = ($width - $size) / 2;
                            $y = ($height - $size) / 2;
                            $image->crop(new Point($x, $y), new Box($size, $size));
                            if ($size > 512) {
                                $image->resize(new Box(512, 512));
                            }
                            $image->save($root . $directory . $name . '.jpg');
                            $athlete->setPicture($directory . $name . '.jpg');
                            if ($filesystem->exists($root . $directory . $name)) {
                                $filesystem->remove($root . $directory . $name);
                            }
                        } catch (FileException $e) {
                        }
                    }
                    elseif (isset($_POST['profile']['_delete_picture']) && $_POST['profile']['_delete_picture']) {
                        $athlete->setPicture(null);
                    }
                    $athleteRepository->save($athlete, true);
                    if (!$oldMeasurement || $form->get('height')->getData() !== $oldMeasurement->getHeight() || isset($oldWeight) && $form->get('weight')->getData() !== $oldMeasurement->getWeight()) {
                        $newMeasurement = new Measurement();
                        $newMeasurement
                            ->setAthlete($athlete)
                            ->setHeight($form->get('height')->getData())
                            ->setWeight($form->get('weight')->getData())
                            ->setDate(new DateTime)
                        ;
                        $measurementRepository->save($newMeasurement, true);
                    }
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

    #[Route('/@{username}/sessions', name: 'sessions')]
    public function sessions(AthleteRepository $athleteRepository, SessionRepository $sessionRepository, String $username): Response
    {
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
}