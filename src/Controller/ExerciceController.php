<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Training\Exercice;
use App\Entity\Training\Set;
use App\Repository\Training\ExerciceRepository;
use App\Repository\Training\SetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/exercice', name: 'exercice_', methods: ['POST'])]
class ExerciceController extends AbstractController
{
    #[Route(path:'/search', name: 'search')]
    public function search(Request $request, ExerciceRepository $exerciceRepository, SetRepository $setRepository): Response
    {
        $search = $request->get('search');
        $equipment = $request->get('equipment');
        $result = array();
        foreach ($exerciceRepository->findBySearch($this->getUser(), $search, $equipment) as $exercice) {
            $lastSet = $setRepository->findOneBy(['exercice' => $exercice, 'dropping' => false], ['date' => 'desc']);
            $result[$exercice->getId()] = [
                'id' => $exercice->getId(),
                'name' => $exercice->getName(),
                'equipments' => $exercice->getEquipments(),
                'symmetry' => $lastSet ? $lastSet->getSymmetry(): Set::BILATERAL
            ];
        }
        return $this->json($result);
    }

    #[Route(path:'/create', name: 'create')]
    public function create(Request $request, ExerciceRepository $exerciceRepository): Response
    {
        $data = $request->get('exercice');
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $exercice = new Exercice();
        $exercice
            ->setName(isset($data['name']) ? $data['name']: null)
            ->setEquipments(isset($data['equipments']) ? $data['equipments']: array())
            ->setAthlete($user)
        ;
        $exerciceRepository->save($exercice, true);
        return $this->json($data);
    }

    #[Route(path:'/edit', name: 'edit')]
    public function edit(Request $request, ExerciceRepository $exerciceRepository): Response
    {
        $data = $request->get('exercice');
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $exercice = $exerciceRepository->findOneBy(['id' => $data['id']]);
        if ($user === $exercice->getAthlete()) {
            $exercice
                ->setName(isset($data['name']) ? $data['name']: null)
                ->setEquipments(isset($data['equipments']) ? $data['equipments']: array())
            ;
            $exerciceRepository->save($exercice, true);
        }
        return $this->json($data);
    }
}