# Odoo 18.0 Development Environment

A robust Docker-based development environment for Odoo 18.0 with PostgreSQL 15.

## Architecture

This setup includes:

- **Odoo 18.0** - Main application server
- **PostgreSQL 15** - Database server with exposed port for external connections
- **Custom addons directory** - For your custom modules and themes
- **Persistent volumes** - For database and filestore data

## Directory Structure

```
odoo-project/
├── docker-compose.yml      # Docker Compose configuration
├── config/
│   └── odoo.conf          # Odoo configuration file
├── addons/                # Place your custom modules here
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

### Starting the Environment

Start all services in detached mode:

```bash
docker compose up -d
```

### Stopping the Environment

Stop all services:

```bash
docker compose down
```

To stop and remove volumes (⚠️ deletes all data):

```bash
docker compose down -v
```

### Viewing Logs

View logs from all services:

```bash
docker compose logs -f
```

View logs from Odoo only:

```bash
docker compose logs -f odoo
```

View logs from PostgreSQL only:

```bash
docker compose logs -f db
```

### Restarting Services

Restart all services:

```bash
docker compose restart
```

Restart Odoo only (useful when developing):

```bash
docker compose restart odoo
```

## Accessing Services

### Odoo Web Interface

- URL: <http://localhost:8069>
- Default admin password: `admin` (configured in odoo.conf)

### PostgreSQL Database

- Host: `localhost`
- Port: `5432`
- Database: `postgres`
- User: `odoo`
- Password: `odoo`

#### Connecting with DBeaver

1. Create a new PostgreSQL connection
2. Use the credentials above
3. Test connection and save

## Development Workflow

### Adding Custom Modules

1. Create your module in the `./addons` directory:

```bash
mkdir -p ./addons/my_custom_module
```

2. Restart Odoo to detect the new module:

```bash
docker compose restart odoo
```

3. Update the Apps list in Odoo:
   - Go to Apps menu
   - Click "Update Apps List"
   - Search for your module
   - Install it

### Enabling Developer Mode

Add this to `config/odoo.conf` under `[options]`:

```ini
dev_mode = reload,qweb,werkzeug,xml
log_level = debug
```

Then restart:

```bash
docker compose restart odoo
```

### Accessing Odoo Shell

For debugging and testing:

```bash
docker compose exec odoo odoo shell -d your_database_name
```

### Running Odoo Commands

Execute any Odoo command:

```bash
docker compose exec odoo odoo --help
```

## Database Management

### Creating a New Database

1. Go to <http://localhost:8069/web/database/manager>
2. Use master password: `admin`
3. Create your database

### Backing Up Database

```bash
docker compose exec db pg_dump -U odoo your_database_name > backup.sql
```

### Restoring Database

```bash
cat backup.sql | docker compose exec -T db psql -U odoo -d your_database_name
```

## Configuration

### Odoo Configuration (`config/odoo.conf`)

The configuration file includes:

- Database connection settings
- Addons path (includes `/mnt/extra-addons`)
- Port configurations
- Development settings (commented out by default)
- Admin master password
- Performance tuning

### Environment Variables

You can override settings using environment variables in `docker-compose.yml`:

- `HOST`: Database host
- `USER`: Database user
- `PASSWORD`: Database password

## Tips

1. **Module Updates**: After modifying module code, restart Odoo and upgrade the module from the Apps menu
2. **Log Monitoring**: Keep logs running in a separate terminal for real-time debugging
3. **Port Conflicts**: If ports 8069 or 5432 are in use, modify them in `docker-compose.yml`
4. **Performance**: For production, increase `workers` in `odoo.conf` based on CPU cores

## Troubleshooting

### Odoo won't start

```bash
# Check logs
docker compose logs odoo

# Ensure database is running
docker compose ps db
```

### Permission Issues

```bash
# Fix addons directory permissions
sudo chown -R $USER:$USER ./addons
```

### Database Connection Failed

```bash
# Verify database is accessible
docker compose exec db psql -U odoo -d postgres
```

### Clear Everything and Start Fresh

```bash
docker compose down -v
docker compose up -d
```

## Additional Resources

- [Odoo 18.0 Documentation](https://www.odoo.com/documentation/18.0/)
- [Odoo Developer Documentation](https://www.odoo.com/documentation/18.0/developer.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)

## Security Notes

⚠️ **Important**: This configuration is for **development only**. For production:

1. Change all default passwords
2. Use environment variables for sensitive data
3. Enable proper security headers
4. Use a reverse proxy (nginx/traefik)
5. Implement proper backup strategies
6. Don't expose PostgreSQL port publicly
