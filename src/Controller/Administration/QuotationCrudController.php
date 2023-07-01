<?php

namespace App\Controller\Administration;

use App\Entity\Culture\Quotation;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class QuotationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Quotation::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextareaField::new('text', 'Texte'),
            TextField::new('author', "Auteur"),
        ];
    }
}
