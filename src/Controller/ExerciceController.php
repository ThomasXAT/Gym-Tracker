<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Training\Exercice;
use App\Repository\Training\ExerciceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/exercice', name: 'exercice_', methods: ['POST'])]
class ExerciceController extends AbstractController
{
    #[Route(path:'/create', name: 'create')]
    public function create(ExerciceRepository $exerciceRepository): Response
    {
        $data = $_POST;
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $exercice = new Exercice();
        $exercice
            ->setName(isset($data['exercice']['name']) ? $data['exercice']['name']: null)
            ->setEquipments(isset($data['exercice']['equipments']) ? $data['exercice']['equipments']: array())
            ->setAthlete($user)
        ;
        $exerciceRepository->save($exercice, true);
        return $this->json($data);
    }

    #[Route(path:'/edit', name: 'edit')]
    public function edit(ExerciceRepository $exerciceRepository): Response
    {
        $data = $_POST;
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $exercice = $exerciceRepository->findOneBy(['id' => $data['exercice']['id']]);
        if ($user === $exercice->getAthlete()) {
            $exercice
                ->setName(isset($data['exercice']['name']) ? $data['exercice']['name']: null)
                ->setEquipments(isset($data['exercice']['equipments']) ? $data['exercice']['equipments']: array())
            ;
            $exerciceRepository->save($exercice, true);
        }
        return $this->json($data);
    }
}