<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Settings;
use App\Repository\SettingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/settings', name: 'settings_')]
class SettingsController extends AbstractController
{
    #[Route(path:'/update', name: 'update')]
    public function update(Request $request, SettingsRepository $settingsRepository): Response
    {
        $data = $request->get('settings');
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $settings = $user->getSettings();
        $settings
            ->setMeasurement(isset($data['measurement']))
            ->setBmi(isset($data['bmi']))
            ->setTraining(isset($data['training']))
            ->setUnit(isset($data['unit']) && $data['unit'] === Settings::LBS ? Settings::LBS: Settings::KG)
            ->setTimer(isset($data['timer']))
        ;
        $settingsRepository->save($settings, true);
        return $this->json($data);
    }

    #[Route(path:'/offset', name: 'offset')]
    public function offset(Request $request, SettingsRepository $settingsRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $settings = $user->getSettings();
        $settings->setOffset((int) $request->get('seconds'));
        $settingsRepository->save($settings, true);
        return $this->json(true);
    }
}