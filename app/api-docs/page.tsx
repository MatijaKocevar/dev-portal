"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./styles.css";

export default function ApiDocsPage() {
    return (
        <section>
            <SwaggerUI url="/swagger.json" />
        </section>
    );
}
