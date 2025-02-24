import React, { useState, useEffect } from "react";
import {
  Divider,
  Link,
  Button,
  Text,
  Input,
  Flex,
  hubspot,
  Card,
} from "@hubspot/ui-extensions";

// Define the extension for HubSpot UI
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
  />
));

const Extension = ({ context, runServerless, sendAlert }) => {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await runServerless({ name: "myFunc" }); // Ensure function name is correct
        console.log("Fetched Products:", result); // Log fetched products
        if (result && result.response) {
          setProducts(result.response.response);
          console.log("Fetched Productsi", result.response.response);
        }
        else {
         
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  // Send text input to serverless function
  const handleClick = async () => {
    try {
      const { response } = await runServerless({
        name: "main",
        parameters: { text },
      });
      sendAlert({ message: response });
    } catch (error) {
      console.error("Error sending request:", error);
      sendAlert({ message: "Failed to send request" });
    }
  };

  console.log("Rendering Products:", products); 
  return (
    <>
      <Text>
        <Text format={{ fontWeight: "bold" }}>
          Your first UI extension is ready!
        </Text>
        Congratulations, {context.user.firstName}! You just deployed your first
        HubSpot UI extension.
      </Text>

      <Flex direction="row" align="end" gap="small">
        <Input name="text" label="Send" onInput={(e) => setText(e.target.value)} />
        <Button type="submit" onClick={handleClick}>
          Click me
        </Button>
      </Flex>

      <Divider />

      <Text format={{ fontWeight: "bold" }}>Fetched Products:</Text>
      {products.length > 0 ? (
        products.map((product) => {
          console.log("Rendering Product:", product); // Log each product while rendering
          return (
            <Card key={product.id}>
              <Text>{product.userId}</Text>
              <Text>{product.title}</Text>
            </Card>
          );
        })
      ) : (
        <Text>No products available.</Text>
      )}

      <Divider />

      <Text>
        Learn more about{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extension-components">
          UI components
        </Link>{" "}
        and{" "}
        <Link href="https://developers.hubspot.com/docs/platform/ui-extensions-overview">
          UI extensions
        </Link>
        .
      </Text>
    </>
  );
};
