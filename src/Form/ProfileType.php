<?php

namespace App\Form;

use App\Entity\Athlete;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
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
                'label' => $this->translator->trans('main.profile.edit.firstname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('surname', TextType::class, [
                'label' => $this->translator->trans('main.profile.edit.surname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])  
            ->add('email', EmailType::class, [
                'label' => $this->translator->trans('main.profile.edit.email'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ]) 
            ->add('password', PasswordType::class, [
                'label' => $this->translator->trans('main.profile.edit.password'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
                'empty_data' => '',
            ])
            ->add('confirmation', PasswordType::class, [
                'label' => $this->translator->trans('main.profile.edit.confirmation'),
                'required' => false,
                'mapped' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('description', TextareaType::class, [
                'required' => false,
                'attr' => ['class' => 'editor'],
            ])  
            ->add('submit', SubmitType::class, [
                'label' => $this->translator->trans('main.profile.edit.submit'),
                'attr' => ['class' => 'btn btn-success'],
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
