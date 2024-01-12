<?php

namespace App\Controller;

use App\Entity\Athlete;
use App\Entity\Settings;
use App\Repository\SettingsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(path: '/settings', name: 'settings_', methods: ['POST'])]
class SettingsController extends AbstractController
{
    #[Route(path:'/update', name: 'update')]
    public function update(Request $request, SettingsRepository $settingsRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $data = $request->get('settings');
        $settings = $user->getSettings();
        $settings
            ->setMeasurement(isset($data['measurement']))
            ->setBmi(isset($data['bmi']))
            ->setTraining(isset($data['training']))
            ->setUnit(isset($data['unit']) && $data['unit'] === Settings::LBS ? Settings::LBS: Settings::KG)
            ->setTimer(isset($data['timer']))
            ->setObjective(isset($data['objective']))
        ;
        $settingsRepository->save($settings, true);
        $this->addFlash('success', 'notifier.settings.save.success');
        return $this->json($data);
    }

    #[Route(path:'/jetlag', name: 'jetlag')]
    public function jetlag(Request $request, SettingsRepository $settingsRepository): Response
    {
        /**
         * @var Athlete $user
         */
        $user = $this->getUser();
        $settings = $user->getSettings();
        $settings->setJetlag((int) $request->get('seconds'));
        $settingsRepository->save($settings, true);
        return $this->json(true);
    }
}