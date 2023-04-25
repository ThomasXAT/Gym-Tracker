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
    private $translator;

    public function __construct() {
        $this->translator = new Translator('fr');
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => $this->translator->trans('authentication.register.firstname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('surname', TextType::class, [
                'label' => $this->translator->trans('authentication.register.surname'),
                'required' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])     
            ->add('username', TextType::class, [
                'label' => $this->translator->trans('authentication.register.username'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('email', EmailType::class, [
                'label' => $this->translator->trans('authentication.register.email'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])     
            ->add('password', PasswordType::class, [
                'label' => $this->translator->trans('authentication.register.password'),
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('confirmation', PasswordType::class, [
                'label' => $this->translator->trans('authentication.register.confirmation'),
                'mapped' => false,
                'attr' => ['class' => 'form-control', 'placeholder' => $this->translator->trans('placeholder')],
                'label_attr' => ['class' => 'form-label'],
            ])
            ->add('submit', SubmitType::class, [
                'label' => $this->translator->trans('authentication.register.submit'),
                'attr' => ['class' => 'btn btn-success'],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Athlete::class,
            'attr' => ['class' => 'mx-auto'],
        ]);
    }
}
