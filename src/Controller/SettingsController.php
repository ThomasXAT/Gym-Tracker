<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Repository\SettingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/settings', name: 'settings_', methods: ['POST'])]
class SettingsController extends AbstractController
{
    #[Route(path:'/update', name: 'update')]
    public function update(SettingsRepository $settingsRepository): Response
    {
        $data = $_POST;
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $settings = $user->getSettings();
        $settings
            ->setBmi(isset($data['settings']['bmi']))
            ->setMeasurement(isset($data['settings']['measurement']))
            ->setUnit(isset($data['settings']['unit']) && $data['settings']['unit'] === 'lbs' ? 'lbs': 'kg')
            ->setTimer(isset($data['settings']['timer']))
        ;
        $settingsRepository->save($settings, true);
        return $this->json($data);

    }
}