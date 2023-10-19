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
        $oldHeight = $user->getHeight();
        $oldWeight = $user->getWeight();
        $newHeight = (float)str_replace(',', '.', $data['height']);
        $newWeight = (float)str_replace(',', '.', $data['weight']);
        if (($newHeight !== $oldHeight) || ($newWeight !== $oldWeight)) {
            $newMeasurement = new Measurement();
            $newMeasurement
                ->setHeight($newHeight ? $newHeight: null)
                ->setWeight($newWeight ? $newWeight: null)
                ->setAthlete($user)
                ->setDate(new DateTime())
            ;
            foreach($measurementRepository->findBy(['height' => null, 'weight' => null]) as $measurement) {
                $measurementRepository->remove($measurement, true);
            }
            if (sizeof($user->getMeasurements()) || ($newMeasurement->getHeight() && $newMeasurement->getWeight())) {
                $measurementRepository->save($newMeasurement, true);
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
            if (sizeof($athlete->getMeasurements()) === 1 && !($athlete->getHeight() && $athlete->getWeight())) {
                $measurementRepository->remove($athlete->getMeasurements()[0], true);
            }
            return $this->redirectToRoute('measurements', ['username' => $measurement->getAthlete()->getUsername()]);
        }
        return $this->redirectToRoute('home');
    }
}