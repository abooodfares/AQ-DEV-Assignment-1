package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        // Time is handled by @CreationTimestamp
        return transactionRepository.save(transaction);
    }

    public List<Transaction> saveTransactions(List<Transaction> transactions) {
        return transactionRepository.saveAll(transactions);
    }

    public List<Transaction> getLatestTransactions() {
        // Return all or limit? The requirement just says "returns the latest
        // transactions".
        // Let's sort by time descending.
        return transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "time"));
    }
}
