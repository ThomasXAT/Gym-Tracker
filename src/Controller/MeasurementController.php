<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Measurement;
use App\Repository\MeasurementRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/measurement', name: 'measurement_', methods: ['POST'])]
class MeasurementController extends AbstractController
{
    #[Route(path:'/add', name: 'add')]
    public function add(MeasurementRepository $measurementRepository): Response
    {
        $data = $_POST;
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        if ($data['height'] && $data['weight']) {
            $measurement = new Measurement();
            $measurement
                ->setHeight($data['height'])
                ->setWeight($data['weight'])
                ->setAthlete($user)
                ->setDate(new DateTime())
            ;
            if (sizeof($user->getMeasurements()) || ($measurement->getHeight() && $measurement->getWeight())) {
                $measurementRepository->save($measurement, true);
            }
        }
        return $this->json($data);

    }

    #[Route(path:'/delete/{id}', name: 'delete')]
    public function delete(Measurement $measurement, MeasurementRepository $measurementRepository): Response
    {        
        $athlete = $measurement->getAthlete();
        if ($this->getUser() === $athlete) {
            $measurementRepository->remove($measurement, true);
            return $this->redirectToRoute('measurements', ['username' => $measurement->getAthlete()->getUsername()]);
        }
        return $this->redirectToRoute('home');
    }
}