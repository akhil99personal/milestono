import { React, useState } from "react";
import "./PrivacyPolicy.css";
import Footer from "../homepage/Footer";
import MainNavBar from "../MainNavBar";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FeedbackOverlay from "../FeedbackOverlay";
function TermsCondition() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <FeedbackOverlay />
      <article className="privacy-policy-container">
        <header className="privacy-policy-header">
          <h1 className="privacy-policy-title">TERMS AND CONDITIONS</h1>
          <p className="privacy-policy-lastUpdated">
            Last updated December 26, 2024
          </p>
        </header>

        <section className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">Introduction</h2>
          <p>
            This website milestono.com , including any subdomains thereof, and
            any other websites through which its services are made available,
            our mobile, tablet and other smart device applications, and
            application program interfaces etc, , (hereinafter collectively
            referred to as &quot;milestono&quot;) is owned, hosted and operated
            (hereinafter referred to as P.I.N PVT.Limited), a company
            incorporated in India under the Companies Act, 1956 and having its
            registered office at Ground Floor, GF-12A, 94, Meghdoot, Nehru
            Place, New Delhi - 110 020. These terms and conditions, privacy
            policy and community guidelines regulating use of these Services
            constitute a legally binding agreement between milestono and the
            User (the “Agreement”).<br></br>
            <br></br>
            milestono and/or any other website(s) linked to this website is an
            online information and communications service provided to you,
            subject to your compliance with the terms and conditions set forth
            below.<br></br>
            <br></br>
            P.I.N PVT.Limited may amend/modify these terms and conditions at any
            time, and such modifications shall be effective immediately upon
            posting of the modified terms and conditions on milestono. You may
            review the modified terms and conditions periodically to be aware of
            such modifications and your continued access or use of milestono,
            shall be deemed conclusive proof of your acceptance of these terms
            and conditions, as amended/modified from time to time. P.I.N
            PVT.Limited may also suspend the operation of milestono for support
            or technical upgradation, maintenance work, in order to update the
            content or for any other reason.<br></br>
            <br></br>
            If you utilize milestono in a manner inconsistent with these terms
            and conditions, P.I.N PVT.Limited may terminate your access, block
            your future access and/or seek such additional relief as the
            circumstances of your misuse may be deemed to be fit and proper.
            <br></br>
            <br></br>
          </p>
        </section>

        <section className="privacy-policy-section section-tableOfContents">
          <div
            className={`privacy-policy-header ${isOpen ? "open" : ""}`}
            onClick={toggleDropdown}
          >
            <h2 className="privacy-policy-sectionTitle title-tableOfContents">
              Contents{" "}
              <span className="arrow">
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </h2>
          </div>
          {isOpen && (
            <ol className="privacy-policy-tableOfContents">
              <li>
                <a href="#section-1" className="privacy-policy-link">
                  Definitions
                </a>
              </li>
              <li>
                <a href="#section-2" className="privacy-policy-link">
                  Subsmission and administration of listings/advertisements
                </a>
              </li>
              <li>
                <a href="#section-3" className="privacy-policy-link">
                  CPL Marketing Campaigns with Developers and Agents/Brokers
                </a>
              </li>
              <li>
                <a href="#section-4" className="privacy-policy-link">
                  Video Community Guidelines
                </a>
              </li>
              <li>
                <a href="#section-5" className="privacy-policy-link">
                  Use of information
                </a>
              </li>
              <li>
                <a href="#section-6" className="privacy-policy-link">
                  Intellectual property rights
                </a>
              </li>
              <li>
                <a href="#section-7" className="privacy-policy-link">
                  Restriction/ Prohibitions
                </a>
              </li>
              <li>
                <a href="#section-8" className="privacy-policy-link">
                  Links to third party web sites
                </a>
              </li>
              <li>
                <a href="#section-9" className="privacy-policy-link">
                  Disclaimer and warranties
                </a>
              </li>
              <li>
                <a href="#section-10" className="privacy-policy-link">
                  Limitation of liability
                </a>
              </li>
              <li>
                <a href="#section-11" className="privacy-policy-link">
                  Termination
                </a>
              </li>
              <li>
                <a href="#section-12" className="privacy-policy-link">
                  Indemnification
                </a>
              </li>
              <li>
                <a href="#section-13" className="privacy-policy-link">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#section-14" className="privacy-policy-link">
                  Arbitration
                </a>
              </li>
              <li>
                <a href="#section-15" className="privacy-policy-link">
                  Severability of provisions
                </a>
              </li>
              <li>
                <a href="#section-16" className="privacy-policy-link">
                  Waiver
                </a>
              </li>
              <li>
                <a href="#section-17" className="privacy-policy-link">
                  Governing law
                </a>
              </li>
              <li>
                <a href="#section-18" className="privacy-policy-link">
                  Jurisdiction
                </a>
              </li>
              <li>
                <a href="#section-19" className="privacy-policy-link">
                  Grievances
                </a>
              </li>
              <li>
                <a href="#section-20" className="privacy-policy-link">
                  Amendment
                </a>
              </li>
            </ol>
          )}
        </section>

        <section id="section-1" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">1. Definition</h2>
          <p>
            The term Subscriber/User would include any person, whether an
            individual or a legal entity who has subscribed to the Services of
            milestono (whether on a paid or free basis), and to whom the access
            to milestono is restricted by the use of a sign in user name and a
            password. The user name and password are either allotted by
            milestono or chosen by the Subscriber or agreed upon by milestono.
            It is made abundantly clear that only the authorized User has the
            right to access the Services so offered by milestono.<br></br>
            <br></br>
            The term Browser/Visitor will mean and include a person who utilizes
            any of the Services offered by milestono, without the need or a
            requirement to create an account i.e. visits non-restricted portions
            of milestono.The term Advertiser would include a Subscriber/User
            uploading or relaying content using the Services.<br></br>
            <br></br>
            The use and access to milestono shall be subject to these terms and
            conditions and community guidelines. For the purposes of this
            Agreement, any person who does not have a legal or a contractual
            right to access the Services, but does so, will fall within the
            definition of an &rsquo;unauthorized user&rsquo; and will
            nevertheless be subject to the terms and conditions regulating the
            usage of milestono, and expressly so with respect to respecting the
            intellectual property rights of the P.I.N PVT.Limited, and abiding
            by terms and conditions below mentioned.<br></br>
            <br></br>
            The terms &rsquo;User&rsquo; and &rsquo;Customer&rsquo; would
            include both the Subscriber/Advertiser(s) and Browser/Visitor(s).
            <br></br>
            <br></br>
            The terms &rsquo;Service&rsquo; or &rsquo;Services&rsquo; would mean
            to include the interactive online information service offered by
            milestono on the internet through which the user may access
            information carried by milestono in the database maintained by it.
            The terms would also include to mean the search tools through which
            the User can search through the hosted databases and information
            using a number of search tools that are present with a selection
            matching their search criteria. The term would also include services
            by way of space used by customers for advertisements such as
            listings and banners. Users then select one or more of the items
            presented to view the full document/ record. The term Service does
            not extend to milestono acting as an agent either express or implied
            on behalf of any User/Customer and is merely acting as a medium of
            information exchange.<br></br>
            <br></br>
            The term RERDA shall mean and include the Real Estate (Regulation
            and Development) Act, 2016
            (http://mhupa.gov.in/User_Panel/UserView.aspx?TypeID=1535) as
            amended read with any rules or regulations that might be framed
            thereunder.<br></br>
            <br></br>
          </p>
        </section>

        <section id="section-2" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            2. Submission and administration of listings/advertisements
          </h2>
          <p>
            User agrees not to submit any property descriptions, photographs,
            financial, contact or other information contained in each
            property&rsquo;s data to milestono unless the User submitting such a
            Listing/Advertisement has acquired and received all necessary rights
            and authorizations from the owner of such property or the
            power-of-attorney holder, including from the photographer and/or
            copyright owner of any photographs, to publish and advertise the
            said Property(s) on the User&rsquo;s website or on milestono.
            Similarly, milestono does not take any ownership, directly or
            indirectly towards any person whatsoever, with respect to banners
            hosted on its website by its customers, which are strictly in the
            nature of sale of space by 99acre & it has not carried out any
            independent verification on the authenticity or compliance
            requirements, as may have been required under any law for the time
            being in force, of such images/ banners/ listings. Some listings may
            contain third party audio/video content (&quot;AV Content”) provided
            for general informational purposes only and such content does not
            constitute a recommendation or solicitation or intends to influence
            any type of purchase or decision. No guarantees are made by
            milestono or the providers of the AV content as to its accuracy or
            completeness.The User agrees to the use of any content or
            information provided to P.I.N PVT.Limited/milestono for promotional,
            marketing, and publicity purposes without any compensation. Where
            you provide us with voice samples or voice recordings to generate
            voiceovers for video listings, you provide us with a royalty-free,
            irrevocable, worldwide, sublicensable, and transferable right and
            licence to use, modify, and further develop the voice samples and
            voice recordings in a manner that milestono deems fit. In case a
            User is covered under the RERDA, it shall obtain all requisite
            approvals, licenses and permits issued by the competent authorities
            with respect to the Project/Land/Apartment/Plot in the listing, by
            following the due process of law. Further, the User shall, at all
            times, remain in compliance with all applicable Laws in relation to
            the Project/Land/Apartment/Plot in the listing. The User shall
            disclose all material information as required by LMA and in respect
            of their registrations under RERDA and all such property(s)
            submitted including the present status and nature of such property
            and shall also disclose whether the property is free from all
            encumbrances or not. The User shall disclose all material factual
            information as regarding the property being advertised, its correct
            dimensions as also in respect of their registrations under RERDA and
            all such property(s) submitted including the present status and
            nature of such property and shall also disclose whether the property
            is free from all encumbrances or not. The User in addition shall
            furnish a brief background of such property in respect of title,
            ownership and possession, P.I.N PVT.Limited may also require the
            User to support his/her claims with respect to the status of the
            property with such documents as may be specified by it from time to
            time. The User may further be required to substantiate his claims as
            to the nature and status of the property by swearing an affidavit
            stating the authenticity of the information/data so
            provided/displayed. P.I.N PVT.Limited may, at its sole discretion
            but without any obligation to, search for such and remove properties
            that are alleged to have been submitted in violation of this
            provision. In addition, P.I.N PVT.Limited may require additional
            evidence of compliance with this provision from Users who are
            alleged to have submitted properties or other information/data in
            violation of these terms and conditions. P.I.N PVT.Limited will, in
            its sole discretion, terminate the accounts of, and refuse Service
            to, any User who repeatedly or intentionally violates these terms
            and conditions. Additionally, the User agrees to allow the Property
            listing, or any part of it, to be searched, displayed, accessed,
            downloaded, copied, and otherwise referred to by users of the
            User&rsquo;s website or the milestono website. P.I.N PVT.Limited
            shall have the sole authority to choose the manner in which any
            Property will be searchable, displayed, accessed, downloaded,
            copied, and otherwise used on milestono and P.I.N PVT.Limited shall
            have the right to modify the property listing in the exercise of its
            rights under these terms and conditions. In addition to the terms
            aforementioned the User agrees<br></br>
            <br></br>
            (a) To represent and warrant that all Properties and associated
            information provided by the User will be accurate;<br></br>
            (b) That the User will not permit the posting of a property on
            milestono under a name other than the name of a real estate agent
            who has been duly authorized and engaged by the owner of the
            property in this regard;<br></br>
            <br></br>
            P.I.N PVT.Limited shall place the information relating to properties
            at defined sections of milestono or such other mirror or parallel
            site(s). P.I.N PVT.Limited reserves, in a manner consistent with
            reasonable commercial business practices, the right to remove all or
            any part of the Properties posted on the User&rsquo;s website or on
            milestono without notice. P.I.N PVT.Limited accepts no
            responsibility for checking/verifying the accuracy of reports or
            data files submitted by the User. While P.I.N PVT.Limited shall take
            all reasonable efforts for data backup and business resumption, the
            User will be solely responsible for retaining back-up copies of all
            information, photographs and other materials furnished/submitted to
            milestono.<br></br>
            <br></br>
            Users, who are buying/renting property/properties through milestono,
            must verify details the property/properties as well as its right,
            title, ownership, lien etc. on their own. The ‘verified’ tag visible
            on property/properties on milestono merely indicates the
            verification of the existence of the property in the manner it has
            been advertised. At no point shall the ‘verified’ tag be construed
            to be a verification of any documentation, ownership details, area
            or pricing details of the property/properties.<br></br>
            <br></br>
          </p>

          <h2 className="privacy-policy-sectionTitle">Payment Terms</h2>
          <p>
            Payments for the Services offered by milestono shall be on a 100%
            advance basis. The payment for Service once subscribed to by the
            subscriber is not refundable and any amount paid shall stand
            appropriated. Refund if any will be at the sole discretion of Info
            Edge (India) Limited. P.I.N PVT.Limited offers no guarantees
            whatsoever for the accuracy or timeliness of the refunds reaching
            the Users card/bank accounts. User acknowledges and agrees that
            P.I.N PVT.Limited/milestono.com, at its sole discretion and without
            prejudice to other rights and remedies that it may have under the
            applicable laws, shall be entitled to set off the amount paid or
            payable by a subscriber/user against any amount(s) payable by User
            to P.I.N PVT.Limited under any other agreement or commercial
            relationship towards other products/services. Info Edge (India) Ltd
            gives no guarantees of server uptime or applications working
            properly. All is on a best effort basis and liability is limited to
            refund of amount only. Info Edge (India) Ltd. undertakes no
            liability for free Services. Info Edge (India) Ltd. reserves its
            right to amend / alter or change all or any disclaimers or terms of
            agreements at any time without any prior notice. All terms /
            disclaimers whether specifically mentioned or not shall be deemed to
            be included if any reference is made to them.<br></br>
            <br></br>
            Info Edge (India) Limited uses the maximum care as is possible to
            ensure that all or any data / information in respect of electronic
            transfer of money does not fall in the wrong hands. For completing
            online transactions involving payments a user is directed to a
            Payment Gateway, Info Edge India Ltd does not store or keep credit
            card data. Since the transaction happens on a third-party network
            not controlled by P.I.N PVT.Limited, once a credit card transaction
            has been completed, the payment information is not accessible to
            anyone at Info Edge (India) Limited after completion of the on-line
            transaction at the Payment Gateway, this ensures the maximum
            security.<br></br>
            <br></br>
            Info Edge India Limited shall not be liable for any loss or damage
            sustained by reason of any disclosure (inadvertent or otherwise) of
            any information concerning the user&rsquo;s account and / or
            information relating to or regarding online transactions using
            credit cards / debit cards and / or their verification process and
            particulars nor for any error, omission or inaccuracy with respect
            to any information so disclosed and used whether or not in pursuance
            of a legal process or otherwise.<br></br>
            <br></br>
          </p>

          <h2 className="privacy-policy-sectionTitle">
            Refund in failed transactions
          </h2>
          <p>
            Though P.I.N PVT.Limited payment reconciliation team works on a 24 x
            7 basis, P.I.N PVT.Limited offers no guarantees whatsoever for the
            accuracy or timeliness of the refunds reaching the Subscribers
            card/bank accounts. This is on account of the multiplicity of
            organizations involved in processing of online transactions, the
            problems with Internet infrastructure currently available and
            working days/holidays of financial institutions. Refunds in the
            event of wrong/objectionable property content being posted on the
            site would be at the discretion of milestono.<br></br>
            <br></br>
            If you utilize milestono in a manner inconsistent with these terms
            and conditions, P.I.N PVT.Limited may terminate your access, block
            your future access and/or seek such additional relief as the
            circumstances of your misuse may be deemed to be fit and proper.
            <br></br>
          </p>
        </section>

        <section id="section-3" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            3. CPL Marketing Campaigns with Developers and Agents/Brokers
          </h2>
          <p>
            <br></br>
            1. In case of CPL marketing campaigns, P.I.N PVT.Limited shall
            endeavor to deliver agreed number of leads at agreed cost per lead.
            <br></br>
            2. In case of CPL marketing campaigns P.I.N PVT.Limited reserves
            right, in its sole discretion, to decide and deploy the
            channel/product for advertising to generate leads.<br></br>
            3. P.I.N PVT.Limited reserves right at its sole discretion, to stop
            any campaign on either completion of its obligation for leads
            delivery or upon non receipt of amount as stipulated under agreed
            terms.<br></br>
            4. P.I.N PVT.Limited neither guarantees nor participates in nor is
            privy to potential conversion of delivered leads or any possible
            transactions as a consequence thereof in any manner whatsoever.
            P.I.N PVT.Limited is an intermediary under the provisions of IT act
            2000. A lead is contact details of a user who has consented to be
            contacted about P.I.N PVT.Limited advertised properties or projects
            or other similar properties.<br></br>
            5. Any advance or amount received against such invoice is
            non-refundable.<br></br>
            6. The customer agrees to strictly adhere to applicable data privacy
            law with respect to the leads delivered by P.I.N PVT.Limited.
            <br></br>
            7. P.I.N PVT.Limited shall not be liable for any loss, direct or
            indirect, to anyone on account of any reason whatsoever.<br></br>
            8. If the same lead(s) is generated for the same project within 30
            days of the 1st unique lead generation date, P.I.N PVT.Limited will
            consider the recurring lead(s) as duplicate and not charge the
            duplicate count. In all other scenarios, lead will be considered as
            unique.<br></br>
            9. The customer shall be responsible for the protection of personal
            data contained in all leads, as per applicable law, and it
            understands that the limited consent obtained by P.I.N PVT.Limited
            is for the purposes of enabling it to share the lead with the
            Customer.<br></br>
          </p>
        </section>

        <section id="section-4" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">4. USER REGISTRATION</h2>
          <p>
            <br></br>
            User agrees to comply with the following community guidelines while
            submitting video content for listings/advertisements:<br></br>
            <br></br>• Video should be original, free from any copyright issue
            <br></br>• Video should not contain any personally identifiable
            information of the User/Agency<br></br>• Video content should not be
            obscene/inappropriate<br></br>• Video should not contain language
            which is detrimental to any community/segment<br></br>
            <br></br>
            Video Content Screening<br></br>
            <br></br>
            Videos shared by user shall go through multiple stages of screening
            (human and technology driven) before going live on the platform. In
            case of violations with the community guidelines, the video content
            shall be duly removed from the listing.<br></br>
            <br></br>
            Additionally, the video screening process shall also be carried out
            in the following cases:<br></br>• User reporting the video to toll
            free/email ids<br></br>• Infringement claim by agent/user<br></br>
            The video shall be removed from the platform in case the claim is
            found to be correct. Final discretion on video screening and removal
            shall always lie with Platform.<br></br>
            <br></br>
            Agents shall have the option to edit or remove videos during the
            course of the listing duration.<br></br>
            <br></br>
            milestono shall utilize 3rd party services such as You-tube for
            hosting and streaming these videos. While doing so, the site and the
            users on the site shall be compliant with respect to You-tube Terms
            of Service https://www.youtube.com/t/terms and Youtube API Services
            - Developer Policies.
          </p>
        </section>

        <section id="section-5" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">5. Use of Information</h2>
          <p>
            User agrees to treat all information obtained from the Service,
            including listings, member directory, and any information otherwise
            made available to User in the Service (&quot;Content&quot;) as
            proprietary to milestono. User agrees that Content reserved for
            members will be maintained as confidential and shall be protected as
            a trade secret of milestono. milestono does not ensure the accuracy
            of, endorse or recommend any Content and a User uses such Content at
            the User&rsquo;s own risk. A User may access the
            listings/advertisements in the Service solely to obtain initial
            information from which further evaluation and investigation may
            commence. User shall limit access to and use of listings to personal
            and internal use, and shall not use listings obtained from the
            Service for further distribution, publication, public display, or
            preparation of derivative works or facilitate any of these
            activities in any way.<br></br>
            <br></br>
            User shall not use or reproduce any Content that is obtained from
            the Service, or that is otherwise made available to User in the
            Service, for or in connection with any other listing/advertising
            Service or device. User further shall not use the Service provided
            by the company in any other manner for or in connection with any
            other listing Service or device. Users violating these specific
            terms, specifically those Users searching the Service in an abusive
            or excessive manner, by automated or manual means, shall be subject
            to immediate termination of their membership without notice.
          </p>
        </section>

        <section id="section-6" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            6. Intellectual property rights
          </h2>
          <p>
            All logos, brands, trade marks and Service marks (&quot;Marks&quot;)
            appearing in milestono are the properties either owned or used under
            license by P.I.N PVT.Limited and / or its associates. All rights
            accruing from the same, statutory or otherwise, wholly vest with
            P.I.N PVT.Limited / its associates. The access to milestono does not
            confer upon the User any license or right to use in respect of these
            Marks and therefore the use of these Marks in any form or manner,
            whatsoever is strictly prohibited. Any violation of the above would
            constitute an offence under the prevailing laws of India.<br></br>
            <br></br>
            P.I.N PVT.Limited respects the Intellectual Property Rights of all,
            it has and will continue to adhere to all the laws applicable in
            India in this respect. P.I.N PVT.Limited shall protect and respect
            the Intellectual Property Rights of the users as well as third
            parties to the best of its ability. In a case where a User(s) are
            found to be using milestono as a platform to infringe the
            Intellectual Property Rights of others, P.I.N PVT.Limited will be
            free to terminate this Agreement forthwith without any notice to the
            user.<br></br>
            <br></br>
            By allowing Users to access milestono, P.I.N PVT.Limited grants the
            Users a limited, non-exclusive, non-assignable, revocable license
            (the &quot;License&quot;) to access and use the Services, provided
            that the User is in compliance with the terms and conditions of the
            Agreement.<br></br>
            <br></br>
          </p>
        </section>

        <section id="section-7" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            7. Restrictions/Prohibitions
          </h2>
          <p>
            1. The following actions will inter alia constitute a misuse of
            milestono and are strictly prohibited:<br></br>
            <br></br>
            a. Utilising the Services offered by milestono in any manner so as
            to impair the interests and functioning of P.I.N
            PVT.Limited/milestono and which is non-compliant with laws and
            regulations including RERDA.<br></br>
            <br></br>
            b. Copying, extracting, downloading, sharing, modifying, selling,
            storing, distributing, making derivate works from or otherwise
            exploiting any content, data, information, including profiles,
            personal details, photographs and/or graphics, available on
            milestono and/or any services or products of the P.I.N PVT.Limited,
            in any manner or for any purpose which is not, consistent with in
            accordance with the Terms of Use.<br></br>
            <br></br>
            Users are expressly prohibited from using or exploiting milestono
            and/or any content or data provided therein for:<br></br>
            <br></br>• Any commercial purposes such as creating alternate
            databases, extending access to milestono to third parties without
            prior written consent of the P.I.N PVT.Limited; and/or<br></br>•
            Undertaking any business activity which is in competition with the
            business of P.I.N PVT.Limited; and/or<br></br>• Sharing access with
            persons who are not contracted with the P.I.N PVT.Limited.<br></br>•
            Reselling the products/services offered by the P.I.N PVT.Limited.
            <br></br>
            <br></br>
            c. (Using or attempting to use any automated program, software or
            system or any similar or equivalent process (including spiders,
            robots, crawlers etc.) to access, navigate, search, copy, monitor,
            download, scrape, crawl or otherwise extract in any manner, any data
            or content including but not limited to adding or downloading
            profiles, contact details, or send or redirect messages from
            milestono;<br></br>
            <br></br>
            d. Gaining or attempting to gain unauthorized access (inter alia by
            hacking, password “mining” or any other means) to: (a) any portion
            or feature of milestono or any of the services or products offered
            on or through milestono which are not intended for you; (b) any
            server, website, program or computer systems of the P.I.N
            PVT.Limited or any other third parties and/or Users;<br></br>
            <br></br>
            e. Modifying the services provided through milestono or their
            appearance using any technology or overlay any additional offering
            on top of such services or simulate milestono’s services or its
            functions in any manner whatsoever without explicit consent obtained
            in writing by approach us at Product@milestono.com<br></br>
            <br></br>
            f. Accessing milestono through interfaces other than those expressly
            provided by P.I.N PVT.Limited;<br></br>
            <br></br>
            g. Attempting to breach or breaching any security or authentication
            measures set up by the P.I.N PVT.Limited in relation to milestono
            and/or attempting to probe, scan or test the vulnerability of the
            P.I.N PVT.Limited’s system or network;<br></br>
            <br></br>
            h. Scraping, downloading (including bulk- downloading), replicating
            or otherwise extracting any information or data from milestono (by
            any process, whether automatic or manual) to offer any products or
            services which are similar to or may in any manner compete with the
            products or services of the P.I.N PVT.Limited;<br></br>
            <br></br>
            i. Reverse engineering, decompiling, disassembling, deciphering or
            otherwise attempting to do any of the aforesaid or deriving the
            source code for the Site or Application or any related technology or
            any part thereof;<br></br>
            <br></br>
            j. Circumventing or attempting to circumvent any technological
            protections used or employed by the P.I.N PVT.Limited or by any
            third party in order to protect the content on milestono and/or to
            exclude robots, spiders etc. from crawling and /or scraping content
            from milestono.<br></br>
            <br></br>
            k. Bypassing or circumventing or trying to circumvent any service
            limits including but not limited to Search limits, Captcha limits
            and occurrences on different triggers<br></br>
            <br></br>
            l. Interfering with or disrupting or attempting to interfere with or
            disrupt (including by using any device, software or routine), the
            use of milestono or any computer networks connected to milestono, by
            any other User;<br></br>
            <br></br>
            m. Developing, using or attempting to use any automated program,
            scripts, robots, third party software or system or any similar or
            equivalent process (including spiders, robots, crawlers, browser
            plug-ins/extensions/add-ons, iframes on third party sites,
            mirroring, HTML parsers etc.) to access, navigate, search, copy,
            monitor, download, scrape, crawl or otherwise extract or modify in
            any manner, any data or content from milestono without explicit
            consent obtained in writing by approach us at legal@milestono.com
            <br></br>
            <br></br>
            n. Impersonating any other person or entity, or making any
            misrepresentation as to your employment by or affiliation with any
            person or entity;<br></br>
            <br></br>
            o. Forging headers or in any manner manipulating identifiers in
            order to disguise the origin of any user information;<br></br>
            <br></br>
            p. Stalking, threatening, or in any manner harassing any other User;
            <br></br>
            <br></br>
            q. Imposing an unreasonable or disproportionately large load on
            milestono’ infrastructure;<br></br>
            <br></br>
            r. Engaging in “framing,” “mirroring,” or otherwise simulating the
            appearance or function of milestono (or any part thereof) and
            providing deep links into milestono (or any part thereof) without
            prior permission of P.I.N PVT.Limited;<br></br>
            <br></br>
            s. Spamming milestono/P.I.N PVT.Limited or any other Users including
            by uploading, posting, emailing, SMS, transmitting or otherwise
            making available either directly or indirectly, any unsolicited bulk
            e-mail or unsolicited commercial e-mail.<br></br>
            <br></br>
            t. Hosting, modifying, uploading, posting, transmitting, publishing,
            or distributing any material or information that:<br></br>
            <br></br>• Violates any applicable local, provincial, state,
            national or international law, statute, ordinance, rule or
            regulation for the time being in force;<br></br>
            <br></br>• Belongs to another person and to which you have no right;
            <br></br>
            <br></br>• Infringes, breaches or otherwise contravenes the rights
            of the P.I.N PVT.Limited or any third party, including any
            copyright, trademark, patent, rights of privacy or publicity or any
            other proprietary rights;<br></br>
            <br></br>• Contains computer viruses, or other computer code, files
            or programs designed to disrupt, destroy or interfere with or limit
            the functioning of milestono, or any other computer system or
            resource;<br></br>
            <br></br>• Is grossly harmful, harassing, invasive of
            another&rsquo;s privacy including bodily privacy, hateful,
            disparaging, relating to or encouraging money laundering or gambling
            in any manner, any content which is or may potentially be perceived
            as being harmful, threatening, abusive, harassing basis of gender,
            libelous, blasphemous, vulgar, pornographic, paedophilic, obscene,
            or racially, ethnically, promoting enmity between different groups
            on the grounds of religion or caste with the intent to incite
            violence or otherwise unlawful in any manner whatsoever;<br></br>
            <br></br>• Which constitutes or encourages conduct that would
            constitute a criminal offence, give rise to other liability, or
            otherwise violate applicable law;<br></br>
            <br></br>• That deceives or misleads the addressee about the origin
            of such messages or communicates any Misinformation or information
            which is grossly offensive or menacing in nature;<br></br>
            <br></br>• That harms minors in any way;<br></br>
            <br></br>• That threatens the unity, integrity, defense, security or
            sovereignty of India, friendly relations with foreign states, or
            public order or causes incitement to the commission of any
            cognisable offence or prevents investigation of any offence or is
            insulting to any other nation.<br></br>
            <br></br>
            You hereby expressly agree not to:<br></br>
            <br></br>
            1. Copy and distribute this information on any other server, or
            modify or re-use information, text, graphics, sound, etc. on
            milestono to any other system. No reproduction of any part of
            milestono may be sold or distributed for commercial gain nor shall
            it be modified or incorporated in any other work, publication or
            milestono, whether in hard copy or electronic format, including
            postings to any other milestono;<br></br>
            2. Remove any copyright, trade mark or other intellectual property
            notices contained in the original material from any material copied
            or printed off from milestono or link to milestono, without our
            express written consent.<br></br>
            <br></br>
            Violations of system or network security may result in civil or
            criminal liability.
          </p>
        </section>

        <section id="section-8" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            8. Links to third party web sites
          </h2>
          <p>
            milestono may provide links to other third-party World Wide Web
            sites or resources. P.I.N PVT.Limited makes no representations
            whatsoever about any other Web site you may access through
            milestono.
          </p>
        </section>

        <section id="section-9" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            9. Disclaimer and warranties
          </h2>
          <p>
            milestono is an intermediary as defined under sub-clause (w) of
            Section 2 of the<br></br>
            Information Technology Act, 2000.<br></br>
            <br></br>
            THE CONTENT OF milestono IS PROVIDED &quot;AS IS&quot; AND ON AN
            &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OR
            REPRESENTATIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED.<br></br>
            <br></br>
            P.I.N PVT.Limited and third party providing materials, services or
            content to this website, disclaims all warranties, express or
            implied, statutory or otherwise icluding, but not limited to,
            implied warranties of merchantability, fitness for a partiular
            purpose, non-infringement of third party rights, completeness or
            accuracy of the information, update or correctness of the
            information, freedom from computer viruses, other violation of
            rights regarding services, products, material and contents of
            milestono.<br></br>
            <br></br>
            Views expressed by the Users are their own, P.I.N PVT.Limited does
            not endorse the same and shall not be responsible for them. No claim
            as to the accuracy and correctness of the information on the site is
            made although every attempt is made to ensure that the content is
            not misleading/ offensive/ inappropriate. In case any inaccuracy is
            or otherwise improper content is sighted on the website, please
            report it to report abuse.<br></br>
            <br></br>
            It is solely your responsibility to evaluate the accuracy,
            completeness and usefulness of all opinions, advice, Services, real
            estate and other related information listed on the website. P.I.N
            PVT.Limited does not warrant that the access to website will be
            uninterrupted or error-free or that defects in website will be
            corrected.<br></br>
            <br></br>
            P.I.N PVT.Limited offers no guarantee no warrantees that there would
            be satisfactory response or any response at all, once the
            listing/banner is put on display. Any payments made to P.I.N
            PVT.Limited/milestono are solely for the purposes of display of the
            property advertised.<br></br>
            Users are strongly advised to independently verify the authenticity
            of any Pre-Launch offers received by them. P.I.N PVT.Limited does
            not endorse investment in any projects which have not received
            official sanction and have not been launched by the
            Builder/Promoter, users dealing in such projects shall be doing so
            entirely at their risk and responsibility.<br></br>
            <br></br>
            No information contained herein shall constitute an invitation or an
            offer to invest in P.I.N PVT.Limited or any of its Affiliates.
            Further, nothing contained in milestono should be construed as a
            recommendation to use any product, process, equipment or
            formulation, in conflict with any patent, or otherwise and P.I.N
            PVT.Limited makes no representation or warranty, express or implied
            that, the use thereof will not infringe any patent, or otherwise.
            <br></br>
            <br></br>
            milestono is controlled and operated from India and P.I.N
            PVT.Limited makes no representation that the materials are
            appropriate or will be available for use in other parts of the
            World. If you use milestono from outside India, you are entirely
            responsible for compliance with all applicable local laws as well as
            international conventions and treaties.<br></br>
            <br></br>
            P.I.N PVT.Limited offers products, Services, content and various
            other functionalities through milestono and its affiliate sites to
            specific regions worldwide. The Services offered in one region may
            differ from those in other regions due to availability, local or
            regional laws or legal impediments and other considerations/factors.
            P.I.N PVT.Limited does not make any warranty or representation that
            a User in one region may also obtain the Services as provided in
            another region. Information on milestono may contain references to
            products, programs or Services that are not announced or available
            in your country. Such references do not in any manner imply that
            P.I.N PVT.Limited intends to announce, launch or provide such
            products, programs or Services in your country.<br></br>
            <br></br>
          </p>
        </section>

        <section id="section-10" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            10. Limitation of liability
          </h2>
          <p>
            P.I.N PVT.Limited will not be liable for any damages of any kind
            arising out of or relating to the use or the inability to use
            milestono, its content or links, including but not limited to
            damages caused by or related to errors, omissions, interruptions,
            defects, delay in operation or transmission, computer virus, line
            failure and all other direct, indirect, special, incidental,
            punitive, loss of profit, exemplary or consequential damages whether
            based on warranty, contract, tort or any other legal theory
            including Force Majeure, and whether or not, such organizations or
            entities were intimated or advised of the possibility of such
            damages.<br></br>
            <br></br>
            P.I.N PVT.Limited assumes no responsibility for any error, omission,
            interruption, deletion, defect, delay in operation or transmission,
            communication line failure, theft or destruction or unauthorized
            access to or alteration of User&rsquo;s data/information. P.I.N
            PVT.Limited shall not be responsible for any problem or technical
            malfunction on-line-systems, servers or providers, computer
            equipment, software, failure of e-mail or players on account of
            technical problem or traffic congestion on the Internet or at any
            website or combination thereof, including injury or damage to any
            User and/or Members or to any other person&rsquo;s computer related
            to or resulting from participating or downloading
            materials/information from the website.<br></br>
            <br></br>
            For the purposes of the Consumer Protection Act, 2019 (CPA), the
            term Consumer will be limited to paid Customers who have not
            subscribed to milestono for purposes of commercial gain (business
            purposes) and their intent to utilize the services for individual
            use only.<br></br>
            <br></br>
            Unless otherwise specified and notwithstanding anything contained in
            any other agreement or arrangement, by whatever name called, the
            performance obligation of P.I.N PVT.Limited (service provider) is to
            provide access of its on-line portal to the customer for the
            duration of the subscription period & reference to any usage, by
            whatever name called or any other performance obligation, if any, is
            to provide the upper limit for consumption, which by itself, does
            not create any additional performance obligation upon P.I.N
            PVT.Limited.<br></br>
            <br></br>
            P.I.N PVT.Limited will not be liable on account of any inaccuracy of
            information on this web site. Any breach of privacy or of the
            information provided by the consumer to P.I.N PVT.Limited to be
            placed on the website by technical or any other means is not the
            responsibility of P.I.N PVT.Limited and P.I.N PVT.Limited does not
            guarantee confidentiality of information provided to it by any
            person acquiring/using all/any information displayed on milestono
            website or any of its other websites / domains owned and operated by
            P.I.N PVT.Limited.<br></br>
            <br></br>
          </p>
        </section>

        <section id="section-11" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">11. Termination</h2>
          <p>
            P.I.N PVT.Limited may, without notice in its sole discretion, and at
            any time, terminate or restrict your use or access to milestono (or
            any part thereof) for any reason, including, without limitation,
            that P.I.N PVT.Limited based on its judgement and perception
            believes you have violated or acted inconsistently with the letter
            or spirit of these terms and conditions or any applicable law.
          </p>
        </section>

        <section id="section-12" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">12. Indemnification</h2>
          <p>
            Submissions and unauthorized use of any information(s)/materials
            contained on milestono may violate copyright laws, trademark laws,
            the laws of privacy and publicity, certain communications statutes
            and regulations thereto and other applicable laws, statutes and its
            rules and regulations. You alone are responsible for your actions or
            the actions of any person using your user name and/or password.
            <br></br>
            <br></br>
            You agree to defend, indemnify, and hold harmless, P.I.N PVT.Limited
            and/ or its associates, subsidiaries, their officers, directors,
            employees, affiliates, licensees, business partners and agents, from
            and against any claims, actions or demands, including without
            limitation reasonable legal and accounting fees, alleging or
            resulting from your use of milestono material or your breach of
            these terms and conditions or any applicable law.<br></br>
            <br></br>
            P.I.N PVT.Limited will not be party to any legal proceedings between
            parties contracted through these Services. In case P.I.N PVT.Limited
            is sought to implicated in any legal proceedings, costs will be
            recovered from the party that names P.I.N PVT.Limited as a party to
            such proceedings. P.I.N PVT.Limited shall abide with any court order
            served on it through due process.<br></br>
            <br></br>
          </p>
        </section>

        <section id="section-13" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">13. Privacy Policy</h2>
          <p>
            The Privacy Policy of the Platform explains how we may use your
            personal data, we will at all times respect and ensure adherence to
            the privacy policy, additionally various settings are provided to
            help you to be able to control the manner in which others may be
            able to view your information as chosen by you to be displayed on
            your profile and the manner in which you may have chosen to be
            contacted. Any feedback provided by a User shall be deemed as
            non-confidential to the user.
          </p>

          <p>
            <br></br>
            <strong>Terms of use for Users</strong>
            <br></br>
            <br></br>• When you indicate your interest in a Real Estate Listing
            or express interest in related services on milestono, you authorize
            milestono to contact you (even though you may have registered with
            NDNC/DNC), and are sending your profile consisting of your personal
            details and application information including relevant documents to
            milestono, and you are requesting and authorizing milestono to make
            available such information contained in your response to the
            applicable Advertiser/seller(s) for such Real Estate Listing(s). You
            provide consent for your data to be provided to such
            Advertisers/service providers and others , who may further contact
            you over the phone/email/whatsapp etc. Please note that our privacy
            policy does not govern the use of your data by third parties once it
            is shared.<br></br>
            <br></br>• In addition, by using milestono, you agree that milestono
            is not responsible for the content of the
            Advertiser/seller’s/broker’s/builder’s application form, messages,
            screener questions, testing assessments; required documents, or
            their format or method of delivery.<br></br>
            <br></br>• You consent to your application, documents and any
            responses sent to you by the Advertiser/seller or vice versa through
            milestono being processed and analyzed by milestono according to
            these terms of use and milestono’s Privacy Policy. milestono shall
            store and process such information regardless of whether a Real
            Estate that had been advertised earlier continues to remain
            available or not. milestono may use your application materials
            (including public profile consisting of your personal details and
            responses to advertiser/seller’s questions) to determine whether you
            may be interested in a Real Estate Listing, and milestono may reach
            out to you about such Real Estate Listing (even though you may have
            registered with NDNC).<br></br>
            <br></br>• Information you post in public areas of milestono sites
            or applications or make visible in your profile, may be accessed,
            used, and stored by others around the world, including those in
            countries that might not have legislation that guarantees adequate
            protection of personal information as defined by your country of
            residence. While milestono takes measures to safeguard your
            information from unauthorized access or inappropriate use, milestono
            does not control these third parties and we are not responsible for
            their use of information you give to us. Accordingly, you should not
            post sensitive information or any other information you would not
            want made public, to any portion of milestono or application or to a
            public website.<br></br>
            <br></br>• Additionally, it shall be the sole responsibility of the
            user to ensure that it uses the ‘Opt-out’ options as it deems fit to
            debar / refuse access of the data fed by it, to dealers. Info Edge
            shall not be responsible for such insertions / data being accessed
            by its subscribers or users whose access has not been specifically
            blocked /debarred by the user while using the privacy settings.
            <br></br>
            <br></br>• In order to use milestono, you may sign in using your
            Facebook/Google login. If you do so, you authorize us to access and
            use certain Facebook/Google account information, including but not
            limited to your public Facebook profile and posts. For more details
            regarding the information we collect from you and how we use it,
            please visit our Privacy Policy.<br></br>
          </p>
        </section>

        <section id="section-14" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">14. Arbitration</h2>
          <p>
            If any dispute arises between a user/users and P.I.N PVT.Limited
            arising out of use of the website or thereafter, in connection with
            the validity, interpretation, implementation or alleged breach of
            any provision of these terms and conditions, the dispute shall be
            referred to a sole Arbitrator who shall be an independent and
            neutral third party. Decision of the Arbitrator shall be final and
            binding on both the parties to the dispute. The place of arbitration
            shall be Delhi. The Arbitration & Conciliation Act, 1996, shall
            govern the arbitration proceedings.
          </p>
        </section>

        <section id="section-15" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">
            15. Severability of provisions
          </h2>
          <p>
            THIS AGREEMENT between you and P.I.N PVT.Limited governs your use of
            milestono. If any provision of these milestono terms and conditions
            or part thereof is inconsistent with or is held to be invalid/void
            by or under any law, rule, order or regulation of any Government or
            by the final adjudication of any court, such inconsistency or
            invalidity shall not affect the enforceability of any other
            provision of the terms and conditions.
          </p>
        </section>

        <section id="section-16" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">16. Waiver</h2>
          <p>
            The failure of P.I.N PVT.Limited to exercise or enforce any right or
            provision of the terms and conditions of use shall not constitute a
            waiver of its right to enforce such right or provision subsequently.
          </p>
        </section>

        <section id="section-17" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">17. Governing law</h2>
          <p>
            By accessing milestono you agree that the laws prevailing in India
            shall be the governing laws in all matters relating to milestono as
            well as these terms and conditions.
          </p>
        </section>

        <section id="section-18" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">18. Jurisdiction</h2>
          <p>
            Courts at New Delhi, India alone shall have the exclusive
            jurisdiction in all matters relating to milestono and these terms
            and conditions, irrespective of the territory and jurisdiction of
            your access to milestono.<br></br>
            <br></br>
            P.I.N PVT.Limited does not routinely monitor your postings to the
            web site but reserves the right to do so. However, if P.I.N
            PVT.Limited becomes aware of an inappropriate use of milestono or
            any of its Services, P.I.N PVT.Limited will respond in any way that,
            in its sole discretion, P.I.N PVT.Limited deems appropriate. You
            acknowledge that P.I.N PVT.Limited will have the right to report to
            law enforcement authorities any actions that may be considered
            illegal, as well as any information it receives of such illegal
            conduct. When requested, P.I.N PVT.Limited will co-operate fully
            with law enforcement agencies in any investigation of alleged
            illegal activity on the Internet.<br></br>
            <br></br>
            P.I.N PVT.Limited reserves all other rights.<br></br>
          </p>
        </section>

        <section id="section-19" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">19. Grievances</h2>
          <p>
            In case you have any complaints and/or grievances in relation to any
            grievances, you can send your complaints via our grievance portal
            located at:<br></br>
            <br></br>
            <strong>
              https://www.milestono.com/load/Company/grievances?lstAcn=T&C&lstAcnId=0&src=FTR
            </strong>{" "}
            <br></br>
            <br></br>
          </p>
        </section>

        <section id="section-20" className="privacy-policy-section">
          <h2 className="privacy-policy-sectionTitle">20. Amendment</h2>
          <p>
            Please report any violations of these terms and conditions to P.I.N
            PVT.Limited at legal@milestono.com<br></br>
            <br></br>
            <strong>Effective from: 25th March 2021</strong>
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}

export default TermsCondition;
