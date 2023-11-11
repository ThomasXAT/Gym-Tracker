<?php

namespace App\Form;

use App\Entity\Athlete;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\Translator;

class RegisterType extends AbstractType
{
    private Translator $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
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
            ->add('username', TextType::class, [
                'label' => $this->translator->trans('athlete.username'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.username')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('email', EmailType::class, [
                'label' => $this->translator->trans('athlete.email'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.email')],
                'required' => false,
                'label_attr' => ['class' => 'form-label'],
            ])     
            ->add('password', PasswordType::class, [
                'label' => $this->translator->trans('athlete.password.label'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.password.label')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('confirmation', PasswordType::class, [
                'label' => $this->translator->trans('athlete.password.confirmation'),
                'required' => false,
                'mapped' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.password.confirmation')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('submit', SubmitType::class, [
                'label' => $this->translator->trans('authentication.register.submit'),
                'attr' => ['class' => 'btn btn-success', 'disabled' => 'disabled'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Athlete::class,
            'attr' => ['id' => 'form-register', 'autocomplete' => 'off', 'class' => 'mx-auto'],
        ]);
    }
}
