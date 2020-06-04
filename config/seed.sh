echo "Creating database and tables......"

mysql --defaults-extra-file=config/config.cnf < config/seed.sql && echo "SUCCESSFULLY CREATED DATABASE AND TABLES" || echo "FAILED TO CREATE DATABASE"
