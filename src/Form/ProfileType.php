<?php

namespace App\Form;

use App\Entity\Athlete;
use App\Entity\Culture\Quotation;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\Translator;
use Symfony\Component\Validator\Constraints\Image;

class ProfileType extends AbstractType
{
    private $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('file', FileType::class, [
                'mapped' => false,
                'required' => false,
                'attr' => ['class' => 'form-control', 'accept' => 'image/*'],
                'constraints' => [
                    new Image([
                        'maxSize' => '2M',
                        'mimeTypes' => [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                        ],
                    ])
                ],
            ])
            ->add('_delete_picture', CheckboxType::class, [
                'mapped' => false,
                'required' => false,
                'attr' => ['hidden' => 'hidden'],
            ])
            ->add('firstname', TextType::class, [
                'label' => $this->translator->trans('athlete.firstname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.firstname')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('surname', TextType::class, [
                'label' => $this->translator->trans('athlete.surname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.surname')],
                'label_attr' => ['class' => 'form-label'],
            ])  
            ->add('email', EmailType::class, [
                'label' => $this->translator->trans('athlete.email'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.email')],
                'label_attr' => ['class' => 'form-label'],
            ]) 
            ->add('password', PasswordType::class, [
                'label' => $this->translator->trans('athlete.password.new'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.password.new')],
                'label_attr' => ['class' => 'form-label'],
                'empty_data' => '',
            ])
            ->add('confirmation', PasswordType::class, [
                'label' => $this->translator->trans('athlete.password.confirmation'),
                'required' => false,
                'mapped' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.password.confirmation')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('description', TextareaType::class, [
                'required' => false,
                'attr' => ['class' => 'editor'],
            ])
            ->add('quotation', EntityType::class, [
                'label' => $this->translator->trans('main.profile.edit.quotation.label'),
                'class' => Quotation::class,
                'choice_label' => 'text',
                'multiple' => false,
                'required' => false,
                'attr' => ['class' => 'form-select'],
                'label_attr' => ['class' => 'form-check-label'],
                'placeholder' => $this->translator->trans('main.profile.edit.quotation.none'),
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Athlete::class,
            'attr' => ['id' => 'form-profile', 'class' => 'mx-auto'],
        ]);
    }
}
