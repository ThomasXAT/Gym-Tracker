<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Measurement;
use App\Repository\MeasurementRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/measurement', name: 'measurement_', methods: ['POST'])]
class MeasurementController extends AbstractController
{
    #[Route(path:'/add', name: 'add')]
    public function add(Request $request, MeasurementRepository $measurementRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $height = $request->get('height');
        $weight = $request->get('weight');
        if (
            $height &&
            $weight &&
            (float)$height >= 0.5 &&
            (float)$height <= 3 &&
            (float)$weight >= 20 &&
            (float)$weight <= 500
        ) {
            $measurement = new Measurement();
            $measurement
                ->setHeight($weight)
                ->setWeight($weight)
                ->setAthlete($user)
                ->setDate(new DateTime())
            ;
            if (sizeof($user->getMeasurements()) || ($measurement->getHeight() && $measurement->getWeight())) {
                $measurementRepository->save($measurement, true);
            }
            return $this->json(true);
        }
        else {
            throw new HttpException(500);
        }

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