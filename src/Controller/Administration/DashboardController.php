<?php

namespace App\Controller\Administration;

use App\Entity\Culture\Quotation;
use App\Entity\Training\Exercice;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route(path:'/admin', name: 'admin')]
    public function shortcut(): Response
    {
        return $this->redirectToRoute('administration');
    }

    #[Route(path:'/administration', name: 'administration')]
    public function index(): Response
    {
        $routeBuilder = $this->container->get(AdminUrlGenerator::class);
        $url = $routeBuilder->setController(QuotationCrudController::class)->generateUrl();
        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Gym-Tracker')
        ;
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::section('Gestion');
        yield MenuItem::linkToCrud('Citations', 'fa-solid fa-quote-left', Quotation::class);
        yield MenuItem::linkToCrud('Exercices', 'fa-solid fa-dumbbell', Exercice::class);
    }
}
