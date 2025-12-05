package com.example.demo.controller;

import com.example.demo.model.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Allow frontend access if needed
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionService.saveTransaction(transaction);
        return ResponseEntity.ok(savedTransaction);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Transaction>> getLatestTransactions() {
        List<Transaction> transactions = transactionService.getLatestTransactions();
        return ResponseEntity.ok(transactions);
    }
}
