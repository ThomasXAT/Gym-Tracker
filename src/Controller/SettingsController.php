<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Settings;
use App\Repository\SettingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/settings', name: 'settings_')]
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
            ->setMeasurement(isset($data['settings']['measurement']))
            ->setBmi(isset($data['settings']['bmi']))
            ->setTraining(isset($data['settings']['training']))
            ->setUnit(isset($data['settings']['unit']) && $data['settings']['unit'] === Settings::LBS ? Settings::LBS: Settings::KG)
            ->setTimer(isset($data['settings']['timer']))
        ;
        $settingsRepository->save($settings, true);
        return $this->json($data);
    }

    #[Route(path:'/offset', name: 'offset')]
    public function offset(SettingsRepository $settingsRepository): Response
    {
        $data = $_GET;
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $settings = $user->getSettings();
        $settings->setOffset((int) $data['seconds']);
        $settingsRepository->save($settings, true);
        return $this->json($data);
    }
}