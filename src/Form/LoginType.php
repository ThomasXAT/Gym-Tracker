<?php

namespace App\Form;

use App\Entity\Athlete;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\Translator;

class LoginType extends AbstractType
{
    private Translator $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'label' => $this->translator->trans('athlete.username'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.username')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('password', PasswordType::class, [
                'label' => $this->translator->trans('athlete.password.label'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('athlete.password.label')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('remember_me', CheckboxType::class, [
                'label' => $this->translator->trans('authentication.login.remember_me'),
                'mapped' => false,
                'required' => false,
                'attr' => ['class' => 'form-check-input'],
                'label_attr' => ['class' => 'form-check-label'],
            ])
            ->add('submit', SubmitType::class, [
                'label' => $this->translator->trans('authentication.login.submit'),
                'attr' => ['class' => 'btn btn-success', 'disabled' => 'disabled'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Athlete::class,
            'attr' => ['id' => 'form-login', 'autocomplete' => 'off',  'class' => 'mx-auto'],
        ]);
    }
}