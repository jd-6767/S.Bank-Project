import React, { useState, useRef } from 'react';
import { Upload, FileText, Table, Download, CheckCircle, AlertCircle, Loader, TrendingUp, DollarSign, BarChart3, FileSpreadsheet } from 'lucide-react';

export default function BankingIntelligence() {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload');
  const [extractedData, setExtractedData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
    setCurrentStep('preview');
  };

  const processDocuments = async () => {
    setProcessing(true);
    setCurrentStep('processing');

    // Simulate AI processing stages
    const stages = [
      { name: 'Document ingestion', duration: 1200 },
      { name: 'OCR & text extraction', duration: 1500 },
      { name: 'Financial statement detection', duration: 1000 },
      { name: 'Line item normalization', duration: 1300 },
      { name: 'Cross-validation', duration: 900 },
      { name: 'Generating spreadsheet', duration: 800 }
    ];

    for (let stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
    }

    // Mock extracted data
    const mockData = {
      company: "ABC Manufacturing Ltd",
      period: "FY 2023",
      currency: "GBP",
      standard: "IFRS",
      statements: {
        profitLoss: [
          { item: "Revenue", value: 12500000, category: "Income" },
          { item: "Cost of Sales", value: -7800000, category: "Direct Costs" },
          { item: "Gross Profit", value: 4700000, category: "Subtotal" },
          { item: "Operating Expenses", value: -2100000, category: "Expenses" },
          { item: "EBITDA", value: 2600000, category: "Subtotal" },
          { item: "Depreciation & Amortization", value: -450000, category: "Non-Cash" },
          { item: "EBIT", value: 2150000, category: "Subtotal" },
          { item: "Interest Expense", value: -180000, category: "Financial" },
          { item: "Profit Before Tax", value: 1970000, category: "Subtotal" },
          { item: "Tax", value: -394000, category: "Tax" },
          { item: "Net Profit", value: 1576000, category: "Bottom Line" }
        ],
        balanceSheet: [
          { item: "Cash & Equivalents", value: 1200000, category: "Current Assets" },
          { item: "Accounts Receivable", value: 2300000, category: "Current Assets" },
          { item: "Inventory", value: 1800000, category: "Current Assets" },
          { item: "Total Current Assets", value: 5300000, category: "Subtotal" },
          { item: "Property, Plant & Equipment", value: 8500000, category: "Fixed Assets" },
          { item: "Total Assets", value: 13800000, category: "Total" },
          { item: "Accounts Payable", value: 1500000, category: "Current Liabilities" },
          { item: "Short-term Debt", value: 800000, category: "Current Liabilities" },
          { item: "Long-term Debt", value: 4200000, category: "Non-Current Liabilities" },
          { item: "Total Liabilities", value: 6500000, category: "Total" },
          { item: "Shareholders' Equity", value: 7300000, category: "Equity" }
        ]
      },
      ratios: {
        profitMargin: 12.6,
        currentRatio: 2.3,
        debtToEquity: 0.89,
        returnOnAssets: 11.4,
        returnOnEquity: 21.6
      }
    };

    setExtractedData(mockData);
    
    const analysis = {
      creditRating: "A-",
      riskLevel: "Low-Medium",
      keyInsights: [
        "Strong revenue growth with healthy margins",
        "Solid liquidity position with current ratio of 2.3",
        "Moderate leverage well within acceptable limits",
        "Consistent profitability across reporting periods"
      ],
      warnings: [
        "Inventory levels elevated - monitor working capital",
        "Interest coverage could be strengthened"
      ]
    };
    
    setAnalysisResult(analysis);
    setProcessing(false);
    setCurrentStep('results');
  };

  const exportToExcel = () => {
    // Create CSV content
    let csv = "Santander Financial Spreading Tool - Export\n\n";
    csv += `Company: ${extractedData.company}\n`;
    csv += `Period: ${extractedData.period}\n`;
    csv += `Currency: ${extractedData.currency}\n`;
    csv += `Standard: ${extractedData.standard}\n\n`;
    
    csv += "PROFIT & LOSS STATEMENT\n";
    csv += "Line Item,Value (000s),Category\n";
    extractedData.statements.profitLoss.forEach(item => {
      csv += `${item.item},${item.value / 1000},${item.category}\n`;
    });
    
    csv += "\n\nBALANCE SHEET\n";
    csv += "Line Item,Value (000s),Category\n";
    extractedData.statements.balanceSheet.forEach(item => {
      csv += `${item.item},${item.value / 1000},${item.category}\n`;
    });
    
    csv += "\n\nKEY RATIOS\n";
    csv += "Ratio,Value\n";
    csv += `Profit Margin,${extractedData.ratios.profitMargin}%\n`;
    csv += `Current Ratio,${extractedData.ratios.currentRatio}\n`;
    csv += `Debt to Equity,${extractedData.ratios.debtToEquity}\n`;
    csv += `Return on Assets,${extractedData.ratios.returnOnAssets}%\n`;
    csv += `Return on Equity,${extractedData.ratios.returnOnEquity}%\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${extractedData.company.replace(/\s+/g, '_')}_Financial_Spread.csv`;
    a.click();
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
      fontFamily: "'Inter', -apple-system, sans-serif",
      color: '#e8edf4',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
          }}>
            <BarChart3 size={28} color="#fff" />
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: 0,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Santander Intelligence
          </h1>
        </div>
        <p style={{
          fontSize: '1.1rem',
          color: '#94a3b8',
          margin: 0,
          paddingLeft: '64px',
          fontWeight: '400'
        }}>
          AI-Powered Financial Document Processing & Spreading
        </p>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Upload Section */}
        {currentStep === 'upload' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4rem',
            textAlign: 'center'
          }}>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.xlsx,.xls,.jpg,.png,.doc,.docx"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)'
            }}>
              <Upload size={40} color="#fff" />
            </div>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Upload Financial Documents
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem'
            }}>
              Upload annual reports, financial statements, or any client documents. 
              Our AI will extract, normalize, and spread the data automatically.
            </p>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 24px rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.4)';
              }}
            >
              Select Documents
            </button>
            
            <div style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                textAlign: 'left'
              }}>
                <div>
                  <FileText size={24} color="#3b82f6" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>PDF Documents</div>
                </div>
                <div>
                  <FileSpreadsheet size={24} color="#10b981" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Excel Spreadsheets</div>
                </div>
                <div>
                  <DollarSign size={24} color="#f59e0b" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Multi-Currency</div>
                </div>
                <div>
                  <TrendingUp size={24} color="#ef4444" style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Automatic Analysis</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview Section */}
        {currentStep === 'preview' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '3rem'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '2rem',
              color: '#fff'
            }}>
              Documents Ready for Processing
            </h2>
            
            <div style={{ marginBottom: '2rem' }}>
              {files.map((file, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  marginBottom: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <FileText size={24} color="#3b82f6" />
                  <div style={{ marginLeft: '1rem', flex: 1 }}>
                    <div style={{ fontWeight: '500', color: '#fff' }}>{file.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  <CheckCircle size={20} color="#10b981" />
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={processDocuments}
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  flex: 1,
                  boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 24px rgba(239, 68, 68, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.4)';
                }}
              >
                Process Documents
              </button>
              
              <button
                onClick={() => {
                  setFiles([]);
                  setCurrentStep('upload');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Processing Section */}
        {currentStep === 'processing' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <Loader size={40} color="#fff" style={{
                animation: 'spin 1s linear infinite'
              }} />
            </div>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#fff'
            }}>
              Processing Financial Documents
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              marginBottom: '3rem'
            }}>
              AI is analyzing your documents and extracting financial data...
            </p>
            
            <div style={{
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              {['OCR & Text Extraction', 'Statement Detection', 'Line Item Normalization', 'Cross-Validation', 'Generating Output'].map((stage, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  marginBottom: '0.75rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <Loader size={18} color="#3b82f6" style={{
                    animation: 'spin 1s linear infinite',
                    animationDelay: `${idx * 0.2}s`
                  }} />
                  <span style={{ marginLeft: '1rem', color: '#cbd5e1' }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {currentStep === 'results' && extractedData && (
          <div>
            {/* Summary Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Company</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>{extractedData.company}</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Period</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>{extractedData.period}</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Credit Rating</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>{analysisResult.creditRating}</div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(245, 158, 11, 0.2)'
              }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Accounting Standard</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>{extractedData.standard}</div>
              </div>
            </div>

            {/* Financial Statements */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* P&L */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <TrendingUp size={24} color="#3b82f6" />
                  Profit & Loss
                </h3>
                
                <div style={{ fontSize: '0.9rem' }}>
                  {extractedData.statements.profitLoss.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      borderBottom: item.category.includes('Total') || item.category.includes('Bottom') 
                        ? '2px solid rgba(239, 68, 68, 0.3)' 
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      fontWeight: item.category.includes('Total') || item.category.includes('Subtotal') || item.category.includes('Bottom') ? '600' : '400'
                    }}>
                      <span style={{ color: '#cbd5e1' }}>{item.item}</span>
                      <span style={{ 
                        color: item.value < 0 ? '#ef4444' : '#10b981',
                        fontFamily: 'monospace'
                      }}>
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Balance Sheet */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <BarChart3 size={24} color="#10b981" />
                  Balance Sheet
                </h3>
                
                <div style={{ fontSize: '0.9rem' }}>
                  {extractedData.statements.balanceSheet.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      borderBottom: item.category === 'Total' 
                        ? '2px solid rgba(239, 68, 68, 0.3)' 
                        : '1px solid rgba(255, 255, 255, 0.05)',
                      fontWeight: item.category === 'Total' || item.category === 'Subtotal' ? '600' : '400'
                    }}>
                      <span style={{ color: '#cbd5e1' }}>{item.item}</span>
                      <span style={{ 
                        color: '#cbd5e1',
                        fontFamily: 'monospace'
                      }}>
                        {formatCurrency(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Ratios */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <DollarSign size={24} color="#f59e0b" />
                Key Financial Ratios
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem'
              }}>
                {Object.entries(extractedData.ratios).map(([key, value]) => (
                  <div key={key} style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#94a3b8',
                      marginBottom: '0.5rem',
                      textTransform: 'capitalize'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style={{ 
                      fontSize: '1.8rem', 
                      fontWeight: '700',
                      color: '#3b82f6'
                    }}>
                      {value}{key.toLowerCase().includes('ratio') ? '' : '%'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Analysis */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: '#fff'
              }}>
                AI Credit Analysis
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#94a3b8',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  Key Insights
                </div>
                {analysisResult.keyInsights.map((insight, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                  }}>
                    <CheckCircle size={18} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{insight}</span>
                  </div>
                ))}
              </div>
              
              <div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#94a3b8',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  Risk Factors
                </div>
                {analysisResult.warnings.map((warning, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}>
                    <AlertCircle size={18} color="#f59e0b" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{warning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={exportToExcel}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 24px rgba(16, 185, 129, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
                }}
              >
                <Download size={20} />
                Export to Excel
              </button>
              
              <button
                onClick={() => {
                  setFiles([]);
                  setExtractedData(null);
                  setAnalysisResult(null);
                  setCurrentStep('upload');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Process New Documents
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
