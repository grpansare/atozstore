# Use Maven to build the application
FROM maven:3.8.4-openjdk-17 as build

# Set the working directory
WORKDIR /app

# Copy the Maven project files to the container
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src



# Build the application and package the WAR file
RUN mvn clean package -DskipTests

# Use a lightweight JDK runtime image to run the application
FROM openjdk:17-jdk-slim

# Set the working directory in the runtime container
WORKDIR /app

# Copy the WAR file from the builder stage
COPY --from=build /app/target/*.war /app/app.war

# Expose the application's port (default Spring Boot port is 8080)
EXPOSE 8081

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "/app/app.war"]
