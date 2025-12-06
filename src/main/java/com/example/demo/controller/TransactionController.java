package com.example.demo.controller;

import com.example.demo.dto.ApiResponse;
import com.example.demo.models.Transaction;
import com.example.demo.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*") // Allow frontend access if needed
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Transaction>> addTransaction(@RequestBody Transaction transaction) {
        try {
            Transaction savedTransaction = transactionService.saveTransaction(transaction);
            return ResponseEntity.ok(ApiResponse.success(savedTransaction, "Transaction added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to add transaction: " + e.getMessage(), 500));
        }
    }

    @PostMapping("/add-many")
    public ResponseEntity<ApiResponse<List<Transaction>>> addTransactions(@RequestBody List<Transaction> transactions) {
        try {
            List<Transaction> savedTransactions = transactionService.saveTransactions(transactions);
            return ResponseEntity.ok(ApiResponse.success(savedTransactions, "Transactions added successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to add transactions: " + e.getMessage(), 500));
        }
    }

    @GetMapping("/latestTransactions")
    public SseEmitter streamTransactions() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        transactionService.addEmitter(emitter);
        System.out.println("Client connected per SSE.");

        emitter.onCompletion(() -> {
            transactionService.removeEmitter(emitter);
            System.out.println("Emitter completed.");
        });
        emitter.onTimeout(() -> {
            transactionService.removeEmitter(emitter);
            System.out.println("Emitter timed out.");
        });
        return emitter;
    }

}
