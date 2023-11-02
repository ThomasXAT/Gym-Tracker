<?php

namespace App\Form;

use App\Entity\Training\Exercice;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\Translator;

class ExerciceType extends AbstractType
{
    private $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('id', TextType::class, [
                'required' => false,
            ])
            ->add('name', TextType::class, [
                'label' => $this->translator->trans('exercice.name'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('exercice.name')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('equipments', ChoiceType::class, [
                'label' => $this->translator->trans('exercice.equipments'),
                'required' => false,
                'label_attr' => ['class' => 'form-label fw-bold'],
                'choices' => Exercice::EQUIPMENTS,
                'multiple' => true,
                'expanded' => true,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Exercice::class,
            'attr' => ['id' => 'form-exercice'],
        ]);
    }
}