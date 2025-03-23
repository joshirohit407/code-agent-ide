import * as vscode from 'vscode';
import { OpenAIService as ModularOpenAIService } from './services/OpenAIService';

/**
 * OpenAIService - Facade/Adapter for the modular OpenAI service implementation
 * 
 * This class maintains the same public interface as the original OpenAIService
 * but delegates all functionality to the new modular implementation.
 */
export class OpenAIService {
  // The actual service implementation
  private serviceImpl: ModularOpenAIService;
  
  // Re-export the onDidUpdateContextFiles event
  public readonly onDidUpdateContextFiles: vscode.Event<string[]>;
  
  constructor() {
    // Initialize the modular service implementation
    this.serviceImpl = new ModularOpenAIService();
    
    // Connect the event from the implementation
    this.onDidUpdateContextFiles = this.serviceImpl.onDidUpdateContextFiles;
  }
  
  /**
   * Validates the OpenAI API key and returns an error message if invalid
   */
  public validateApiKey(): { valid: boolean; message?: string } {
    return this.serviceImpl.validateApiKey();
  }
  
  /**
   * Process a user query and generate a response
   */
  public async processQuery(query: string): Promise<string> {
    return this.serviceImpl.processQuery(query);
  }
  
  /**
   * Add a file to the context files list
   * @param filePath The path to the file that was accessed
   */
  public addContextFile(filePath: string): void {
    this.serviceImpl.addContextFile(filePath);
  }
  
  /**
   * Get the list of context files
   * @returns Array of file paths that have been used for context
   */
  public getContextFiles(): string[] {
    return this.serviceImpl.getContextFiles();
  }
  
  /**
   * Clear the list of context files
   */
  public clearContextFiles(): void {
    this.serviceImpl.clearContextFiles();
  }
}
