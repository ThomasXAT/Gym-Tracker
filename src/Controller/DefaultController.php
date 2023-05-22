<?php

namespace App\Controller;

use App\Form\ProfileType;
use App\Repository\AthleteRepository;
use Doctrine\ORM\EntityManagerInterface;
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
    public function home(): Response
    {
        if (isset($_GET["search"])) {
            return $this->render('main/repertory/index.html.twig', [
                'page' => 'repertory',
                'search' => $_GET["search"],
            ]);
        }
        return $this->render('main/home/index.html.twig', [
            'page' => 'home',
        ]);
    }

    #[Route('/@{username}', name: 'profile')]
    public function profile(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, AthleteRepository $athleteRepository, String $username): Response
    {
        $athlete = $athleteRepository->findOneBy(['username' => $username]);
        if ($athlete) {
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
                    $entityManager->persist($athlete);
                    $entityManager->flush();
                    if ($newPassword) {
                        return $this->redirectToRoute('authentication_logout');
                    }
                    return $this->redirectToRoute('profile', ['username' => $athlete->getUsername()]);
                }
                else {
                    return $this->render('main/profile/index.html.twig', [
                        'page' => 'profile',
                        'athlete' => $athlete,
                        'form' => $form,
                    ]);
                }
            }
            return $this->render('main/profile/index.html.twig', [
                'page' => 'profile',
                'athlete' => $athlete,
            ]);
        }
        throw new NotFoundHttpException('Athlete not found. The requested user does not exist.');
    }
}