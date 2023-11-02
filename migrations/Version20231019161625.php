<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231019161625 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exercice ADD athlete_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE exercice ADD CONSTRAINT FK_E418C74DFE6BCB8B FOREIGN KEY (athlete_id) REFERENCES athlete (id)');
        $this->addSql('CREATE INDEX IDX_E418C74DFE6BCB8B ON exercice (athlete_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exercice DROP FOREIGN KEY FK_E418C74DFE6BCB8B');
        $this->addSql('DROP INDEX IDX_E418C74DFE6BCB8B ON exercice');
        $this->addSql('ALTER TABLE exercice DROP athlete_id');
    }
}
