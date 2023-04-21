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
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $translator = new Translator('fr');
        $builder
            ->add('firstname', TextType::class, [
                'label' => $translator->trans('authentication.register.firstname'),
            ])
            ->add('surname', TextType::class, [
                'label' => $translator->trans('authentication.register.surname'),
            ])     
            ->add('username', TextType::class, [
                'label' => $translator->trans('authentication.register.username'),
            ])
            ->add('email', EmailType::class, [
                'label' => $translator->trans('authentication.register.email'),
            ])     
            ->add('password', PasswordType::class, [
                'label' => $translator->trans('authentication.register.password'),
            ])
            ->add('confirmation', PasswordType::class, [
                'label' => $translator->trans('authentication.register.confirmation'),
                'mapped' => false,
            ])
            ->add('submit', SubmitType::class, [
                'label' => $translator->trans('authentication.register.submit'),
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Athlete::class,
        ]);
    }
}
