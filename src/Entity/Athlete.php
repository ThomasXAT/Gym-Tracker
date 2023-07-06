<?php

namespace App\Entity;

use App\Entity\Culture\Quotation;
use App\Entity\Training\Session;
use App\Repository\AthleteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: AthleteRepository::class)]
#[UniqueEntity(fields: ['username'], message: 'Cet identifiant n\'est pas disponible')]
class Athlete implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 16, unique: true)]
    private ?string $username = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 128, nullable: false)]
    private ?string $email = null;

    #[ORM\Column(length: 24, nullable: true)]
    private ?string $firstname = null;

    #[ORM\Column(length: 24, nullable: true)]
    private ?string $surname = null;

    #[ORM\OneToMany(mappedBy: 'athlete', targetEntity: Session::class)]
    private Collection $sessions;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $picture = null;

    #[ORM\ManyToOne(inversedBy: 'athletes')]
    private ?Quotation $quotation = null;

    #[ORM\OneToMany(mappedBy: 'athlete', targetEntity: Measurement::class, orphanRemoval: true)]
    private Collection $measurements;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $registration = null;

    #[ORM\Column(nullable: true)]
    private ?bool $measurement = null;

    public function __construct()
    {
        $this->sessions = new ArrayCollection();
        $this->measurements = new ArrayCollection();
    }

    public function __toString()
    {
        $string = $this->getUsername();
        if ($this->getFirstname() || $this->getSurname()) {
            $string .= ' (';
            if ($this->getFirstname()) {
                $string .= $this->getFirstname();
                if ($this->getSurname()) {
                    $string .= ' ';
                }
            }
            if ($this->getSurname()) {
                $string .= $this->getSurname();
            }
            $string .= ')';
        }
        return $string;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getSurname(): ?string
    {
        return $this->surname;
    }

    public function setSurname(?string $surname): self
    {
        $this->surname = $surname;

        return $this;
    }

    /**
     * @return Collection<int, Session>
     */
    public function getSessions(): Collection
    {
        return $this->sessions;
    }

    public function addSession(Session $session): self
    {
        if (!$this->sessions->contains($session)) {
            $this->sessions->add($session);
            $session->setAthlete($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->removeElement($session)) {
            // set the owning side to null (unless already changed)
            if ($session->getAthlete() === $this) {
                $session->setAthlete(null);
            }
        }

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

        return $this;
    }

    public function getQuotation(): ?Quotation
    {
        return $this->quotation;
    }

    public function setQuotation(?Quotation $quotation): self
    {
        $this->quotation = $quotation;

        return $this;
    }

    /**
     * @return Collection<int, Measurement>
     */
    public function getMeasurements(): Collection
    {
        return $this->measurements;
    }

    public function addMeasurement(Measurement $measurement): self
    {
        if (!$this->measurements->contains($measurement)) {
            $this->measurements->add($measurement);
            $measurement->setAthlete($this);
        }

        return $this;
    }

    public function removeMeasurement(Measurement $measurement): self
    {
        if ($this->measurements->removeElement($measurement)) {
            // set the owning side to null (unless already changed)
            if ($measurement->getAthlete() === $this) {
                $measurement->setAthlete(null);
            }
        }

        return $this;
    }

    public function getRegistration(): ?\DateTimeInterface
    {
        return $this->registration;
    }

    public function setRegistration(\DateTimeInterface $registration): self
    {
        $this->registration = $registration;

        return $this;
    }

    public function isMeasurement(): ?bool
    {
        return $this->measurement;
    }

    public function setMeasurement(bool $measurement): self
    {
        $this->measurement = $measurement;

        return $this;
    }

    public function isWorkingOut(): bool
    {
        if ($session = $this->getSessions()[$this->getSessions()->count()-1]) {
            return $session->isCurrent();
        }
        return false;
    }
}
