package com.example.demo.service;

import com.example.demo.model.Transaction;
import com.example.demo.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction saveTransaction(Transaction transaction) {
        // Ensure time is set if not provided? Or trust the generator.
        // Assuming generator provides time, but we can set it here if null.
        if (transaction.getTime() == null) {
            transaction.setTime(LocalDateTime.now());
        }
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getLatestTransactions() {
        // Return all or limit? The requirement just says "returns the latest
        // transactions".
        // Let's sort by time descending.
        return transactionRepository.findAll(Sort.by(Sort.Direction.DESC, "time"));
    }
}
