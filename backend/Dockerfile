# Stage 1: Build the application
FROM eclipse-temurin:17-jdk-focal AS build
WORKDIR /app

RUN apt-get update && apt-get install -y maven
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
