import { React, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

function LoanPageQA() {
  const isMobileView = window.innerWidth <= 768;

  const homeLoanFAQs = [
    {
      title: "What are the types of home loan available?",
      description: `
      <strong>Home purchase loan:</strong> It is the most common type of home loan. All banks and housing finance companies offer loans for residential properties at different rates coupled with discounts and rebates. It can be availed for both resale properties and builder-allocated units.<br><br>
      <strong>Land/Plot loan:</strong> Banks offer such types of loans to buyers intending to purchase land parcels for constructing their residential units. About 70 percent of the total cost of the land can be availed.<br><br>
      <strong>Construction loan:</strong> The most common type of home loan availed by a major share of the semi-urban population to build a home meeting their requirements on a land parcel you already own. All housing finance companies and banks provide home construction loans.<br><br>
      <strong>Home extension/improvement loan:</strong> You can also avail loans for any sort of extension or improvement in your house, be it a new room or a new floor. Housing finance companies and banks offer loans for home improvement/renovation purposes such as painting, plumbing, electrical systems, interior designing, and waterproofing.<br><br>
      <strong>Home conversion loan:</strong> Such home loans are taken by people who have bought a house on a home loan but now intend to buy and move to a new house. With these loans, applicants can fund the purchase of the new house by shifting the running loan to the new unit.<br><br>
      <strong>NRI home loan:</strong> It is designed for NRIs who wish to construct or buy a home in India.
    `,
      firstcard: "first-accordion-item",
    },
    {
      title:
        "What is the difference between fixed rate and floating rate of interest?",
      description:
        "Taking home loan on a fixed interest rate implies that your EMI will not be impacted during the loan tenure irrespective of any market conditions. The interest rate will be pre-determined and remain unchanged. On the flip side, home loan EMis vary periodically over the loan tenure, if taken on floating interest rate.",
    },
    {
      title: "Are there any other charges that accompany home loans?",
      description: `
      <p>
      There are some hidden charges applicable while opting for a home loan.<br><br>
      <ul>
        <li>Conversion Fees</li>
        <li>MODT Charges (Memorandum of Deposit of Title Deed)</li>
        <li>Document Retrieval Charges</li>
        <li>Administrative Charges</li>
        <li>Legal Fees</li>
        <li>Valuation Fees / Inspection Fees</li>
        <li>Documentation Charges</li>
        <li>Switching Loan Package</li>
        <li>Changing Loan Tenure</li>
        <li>Statement of Account</li>
      </ul>
      </p>
      `,
    },
    {
      title: "How to calculate interest on a home loan?",
      description: `
      Calculating the monthly interest levied on your home loan is easy. Follow these steps -<br><br>
      <ul>
      <li>Divide interest rate by the number of payments. If you are making monthly payments, divide by 12.</li>
      <li>Multiply it by the loan amount.</li>
      </ul>
      <br>Doing this will give you the amount of interest.<br>
      `,
    },
    {
      title: "What is the home loan process?",
      description: `
      The process of getting a home loan is simple. But you need to be aware of all documents required before applying for the loan.<br><br>
      <ul>
      <li>Fill loan application form with all required documents</li>
      <li>Pay processing fee</li>
      <li>Discussion with the bank</li>
      <li>Valuation of the submitted documents</li>
      <li>Loan approval process</li>
      <li>Processing of the offer letter</li>
      <li>Legal check</li>
      <li>Final loan deal, signing the agreement, and disbursal</li>
      </ul>
      `,
      lastcard: "last-accordion-item",
    },
  ];

  const bankFAQs = [
    {
      title: "What are the processing fees charged by the bank?",
      description:
        "Processing fee charged while applying for home loan varies from bank to bank. Typically, the processing fee is about 0.5 percent to 1 percent of the loan amount + applicable Service Tax and Surcharge. The maximum processing fee ranges between Rs 10,000-15,000 excluding applicable taxes.",
      firstcard: "first-accordion-item",
    },
    {
      title: "Which bank has lowest interest rate for home loan?",
      description:
        "All banks provide loan against properties at different interest rates. One of the top nationalised banks, SBI charges interest rate of 8.35 percent to 8.65 percent for general customers. The interest rates are irrespective of the loan amount. Note: If you take loan in the name of a female member, all banks offer slightly reduced interest rates.",
    },
    {
      title: "Which bank home loan is best in India?",
      description: `
      Banks and housing finance companies do offer home loan at lucrative interest rates combined with offers and incentives. If you are unable to make up your mind while choosing a bank for taking home loan, here are some of the best financial institutes granting home loan in India -<br><br>

      <ul>
        <li>ICICI Bank</li>
        <li>HDFC Limited</li>
        <li>SBI</li>
        <li>Yes Bank</li>
        <li>Axis Bank</li>
        <li>PNB Housing</li>
        <li>DHFL</li>
        <li>Indiabulls</li>
      </ul>
      `,
      lastcard: "last-accordion-item",
    },
  ];

  const loanEmiFAQs = [
    {
      title: "What is EMI?",
      description:
        "EMI stands for equated monthly installments. As a borrower, you need to pay the lender a fixed amount every month on a specified date. The EMI is the sum total of the principal amount and the interest amount divided over the tenure of the loan. However, your monthly value is fixed for each month, the principal amount paid and interest amount paid changes every month. For the first few years, the interest portion is higher. With time, the interest amount keeps reducing and principal amount keeps increasing. Therefore, your 70-75% interest will be paid in the first few years of the entire loan tenure.",
      firstcard: "first-accordion-item",
    },
    {
      title: "What is Home-Loan EMI?",
      description:
        "Home loan is a loan taken from any financial institution for buying a house. The EMI that is calculated for this loan is termed as a Home loan EMI.",
    },
    {
      title: "How is EMI calculated?",
      description:
        "EMI is calculated using a simple mathematical formula, that is EMI Amount = [P x R x (1+R)^N]/[(1+R)^N-1]. Here P stands for the principal loan amount, R is the rate of interest and N is the number of years for which the loan is taken. The value of the EMI changes according to these variables",
    },
    {
      title: "What happens if I miss an EMI payment?",
      description:
        "Missing an EMI may result in penalties and affect your credit score.",
      lastcard: "last-accordion-item",
    },
  ];

  const loanEligibilityFAQs = [
    {
      title: "What are the eligibility criteria for home loans?",
      description:
        "There is an eligibility criterion that banks have before they go ahead sanctioning it. A few important of them are employment stability, age criteria, credit rating, financial stability etc.",
      firstcard: "first-accordion-item",
    },
    {
      title: "How is eligibility for home loan calculated?",
      description: `
      Some steps to calculate your home loan eligibility are:<br><br>
      
      <ul>
      <li>To calculate the income level, banks will investigate your salary slips and bank statements.</li>
      <li>Next, it calculates the amount saved assuming that 30% of your savings is from your INCOME.</li>
      <li>If there are existing loans, the EMI is reduced from the income level.</li>
      <li>According to the income level and savings, the bank calculates a home loan amount.</li>
      </ul>
      `,
    },
    {
      title: "What is the minimum salary for home loan?",
      description:
        "Banks usually up to 60 times your monthly net income (salary). You can calculate your home loan eligibility using the home loan eligibility calculator.",
    },
    {
      title: "Can self-employed individuals apply for home loans?",
      description:
        "Yes, self-employed individuals can apply with additional documentation.",
    },
    {
      title:
        "What are the eligibility requirements for an NRI seeking home loan?",
      description: `
      Following are the eligibility criteria for an NRI seeking home loan:<br><br>
      <ul>
        <li>An Indian citizen holding a valid Indian passport.</li>
        <li>The passport should be free from NO ENTRY stamp. This stamp does not allow an NRI to enter the country.</li>
        <li>The passport of the NRI applicant should have a valid entry visa.</li>
        <li>Valid PIO/OCI Card copy to be documented with foreign country passport for PIO/OCI.</li>
      </ul>
      `,
      lastcard: "last-accordion-item",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Home Loan");

  const categoryFAQs = {
    "Home Loan": homeLoanFAQs,
    Banks: bankFAQs,
    "Loan EMI": loanEmiFAQs,
    "Loan Eligibility": loanEligibilityFAQs,
  };

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="loan-faq">
      <div className="loan-faq-container">
        <h2 className="loan-callback-title">
          Frequently asked questions about Home Loans
        </h2>
        <p className="loan-callback-subtitle">
          Know what questions the users frequently ask about Home loans and
          calculators.
        </p>

        <div className="faq-categories">
          {Object.keys(categoryFAQs).map((category) => (
            <button
              key={category}
              className={`faq-category-button ${selectedCategory === category ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(category);
                setActiveIndex(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <br />

        <div className="accordion-item-container">
          {categoryFAQs[selectedCategory].map((item, index) => (
            <div
              key={index}
              className={`accordion-item ${item.firstcard} ${item.lastcard} ${activeIndex === index ? "active" : ""} loan-faqs`}
            >
              <div
                className="accordion-header"
                onClick={() => handleToggle(index)}
              >
                <span>{item.title}</span>
                <span className="accordion-item-icon">
                  {activeIndex === index ? (
                    isMobileView ? (
                      <FiX size={15} />
                    ) : (
                      <FiX size={20} />
                    )
                  ) : isMobileView ? (
                    <FiPlus size={15} />
                  ) : (
                    <FiPlus size={20} />
                  )}
                </span>
              </div>
              <div className="accordion-content">
                <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoanPageQA;
