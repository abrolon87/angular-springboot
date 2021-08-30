package com.amanda.ecommerce.backend.config;


import com.amanda.ecommerce.backend.entity.Country;
import com.amanda.ecommerce.backend.entity.Product;
import com.amanda.ecommerce.backend.entity.ProductCategory;
import com.amanda.ecommerce.backend.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        //Makes Product repo READ ONLY
        disableHttpMethods(Product.class, config, unsupportedActions);

        //Makes ProductCategory repo READ ONLY
        disableHttpMethods(ProductCategory.class, config, unsupportedActions);

        //Makes Country repo READ ONLY
        disableHttpMethods(Country.class, config, unsupportedActions);

        //Makes State repo READ ONLY
        disableHttpMethods(State.class, config, unsupportedActions);

        // call internal helper method
        exposeIds(config);
    }

    private void disableHttpMethods(Class klass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(klass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        //expose entity IDs


        // get list of all entity classes from entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // create array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        // get the entity typees for the entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // expose the entity Ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }


}
