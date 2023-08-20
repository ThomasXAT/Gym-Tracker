<?php

namespace App\Controller\Administration;

use App\Entity\Biomechanics\Movement;
use App\Entity\Training\Exercice;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ExerciceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Exercice::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'Nom'),
            ChoiceField::new('equipments', "Équipements")->allowMultipleChoices()->setChoices(Exercice::EQUIPMENTS),
            AssociationField::new('movements', 'Mouvements'),
        ];
    }
}
