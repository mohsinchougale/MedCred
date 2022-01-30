# MedCred

With the sharp increase in Health Security breaches, we are proposing a Blockchain technology infused solution, to ensure that patient's sensitive data is safe and secure at all times.

# What it does
This website uses technology of Smart Contracts to establish a secure connection between the Patient and Doctor. The Doctor uses this platform to send the diagnosis as well as the medicine prescrption in a text format, which will be visible to the Patient on the Rinkeby Testnet Etherscan. Because all the data is being stored on the blockchain, even previous transactions(chat history) can be viewed on the Rinkeby Etherscan. Although all this data may be stored on the Blockchain, but only the patient will know their Patient wallet address, so the chance of leakage of data is directly dependent on how many people is the knowledge of the walllet address shared with. Hence if the Patient keeps thier Wallet address as secret, their data will be very secure and safe. These transactions are possible because of the Metamask API that allows the user to inject Web3 Technology at connect their Metamask wallet to the MedCred website.

# How we built it

The main tech stack used for building the website is the MERN stack, i.e. MongoDB for backend storage of Doctor and Patient details and React.js to build the frontend. We used Solidity to code and deploy the Smart Contracts that define all the rules of communication. And when the registration is being done, the website will check if an Ethereum wallet is present. If it is present(eg. Metamask), then the user will be prompted to connect their wallet to the website. If a wallet is not present then the user will first have to make an Ethereum wallet and then proceed with the registration.

# What we have learned

All the team members learnt about Blockchain technology for the first time. So we had to learn everything from scratch. Right from deploying Smart Contracts to integrating Metamask wallet with our website. We also had to learn how to maintain the security of data at all times, to avoid malicious attacks being succcesful.
