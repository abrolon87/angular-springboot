package com.amanda.ecommerce.backend.dao;

import com.amanda.ecommerce.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
