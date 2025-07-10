/**
 * Fixed Draw.io Diagram Generator
 * Creates properly formatted XML with correct syntax
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FixedDiagramGenerator {
    constructor() {
        this.cellCounter = 0;
    }

    generateId() {
        return `cell_${++this.cellCounter}`;
    }

    escapeXml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    createUseCaseDiagram() {
        this.cellCounter = 1;
        let content = '';

        // System boundary
        const systemBoundary = this.generateId();
        content += `        <mxCell id="${systemBoundary}" value="Система інтернет-магазину ТехноСвіт" style="swimlane;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=16;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="50" width="620" height="680" as="geometry"/>
        </mxCell>
`;

        // Actors
        const visitor = this.generateId();
        content += `        <mxCell id="${visitor}" value="Відвідувач" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="180" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const user = this.generateId();
        content += `        <mxCell id="${user}" value="Зареєстрований\\nкористувач" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="350" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const admin = this.generateId();
        content += `        <mxCell id="${admin}" value="Адміністратор" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="50" y="520" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const paymentSystem = this.generateId();
        content += `        <mxCell id="${paymentSystem}" value="Платіжна\\nсистема" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="850" y="350" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        // Use Cases - Visitor
        const catalog = this.generateId();
        content += `        <mxCell id="${catalog}" value="Перегляд каталогу товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="40" y="80" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const search = this.generateId();
        content += `        <mxCell id="${search}" value="Пошук товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="220" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const filter = this.generateId();
        content += `        <mxCell id="${filter}" value="Фільтрація товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="380" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const viewProduct = this.generateId();
        content += `        <mxCell id="${viewProduct}" value="Перегляд деталей товару" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="40" y="170" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        // Use Cases - User
        const register = this.generateId();
        content += `        <mxCell id="${register}" value="Реєстрація користувача" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="220" y="270" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const login = this.generateId();
        content += `        <mxCell id="${login}" value="Авторизація" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="380" y="270" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const cart = this.generateId();
        content += `        <mxCell id="${cart}" value="Управління кошиком" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="40" y="360" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const order = this.generateId();
        content += `        <mxCell id="${order}" value="Оформлення замовлення" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="220" y="360" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const payment = this.generateId();
        content += `        <mxCell id="${payment}" value="Оплата замовлення" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="380" y="360" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const orderHistory = this.generateId();
        content += `        <mxCell id="${orderHistory}" value="Перегляд історії замовлень" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="40" y="450" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        // Use Cases - Admin
        const manageProducts = this.generateId();
        content += `        <mxCell id="${manageProducts}" value="Управління товарами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="220" y="540" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const manageCategories = this.generateId();
        content += `        <mxCell id="${manageCategories}" value="Управління категоріями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="380" y="540" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const manageOrders = this.generateId();
        content += `        <mxCell id="${manageOrders}" value="Управління замовленнями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="40" y="540" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const manageUsers = this.generateId();
        content += `        <mxCell id="${manageUsers}" value="Управління користувачами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="220" y="450" width="140" height="70" as="geometry"/>
        </mxCell>
`;

        const reports = this.generateId();
        content += `        <mxCell id="${reports}" value="Генерація звітів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="${systemBoundary}">
          <mxGeometry x="380" y="450" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // Visitor connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${visitor}" target="${catalog}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${visitor}" target="${search}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${visitor}" target="${filter}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${visitor}" target="${viewProduct}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${visitor}" target="${register}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // User connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${login}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${cart}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${order}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${payment}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${orderHistory}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // Admin connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${login}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${manageProducts}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${manageCategories}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${manageOrders}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${manageUsers}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${reports}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // External system connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${paymentSystem}" target="${payment}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // Include relationships
        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;" edge="1" parent="1" source="${order}" target="${login}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=open;endSize=12;dashed=1;html=1;rounded=0;" edge="1" parent="1" source="${cart}" target="${login}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createERDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Users table
        const users = this.generateId();
        content += `        <mxCell id="${users}" value="Users" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="200" height="182" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${users}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="name" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${users}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="email" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${users}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="password" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${users}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="is_admin" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${users}">
          <mxGeometry y="130" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="created_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${users}">
          <mxGeometry y="156" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Categories table
        const categories = this.generateId();
        content += `        <mxCell id="${categories}" value="Categories" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="350" y="50" width="200" height="130" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${categories}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="name" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categories}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="description" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categories}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="created_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categories}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Products table
        const products = this.generateId();
        content += `        <mxCell id="${products}" value="Products" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="650" y="50" width="200" height="260" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${products}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="category_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${products}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="name_uk" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="description" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="price" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="130" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="quantity" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="156" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="images" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="182" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="is_active" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="208" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="created_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${products}">
          <mxGeometry y="234" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Orders table
        const orders = this.generateId();
        content += `        <mxCell id="${orders}" value="Orders" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="50" y="350" width="200" height="208" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${orders}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="user_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${orders}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="total_amount" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orders}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="status" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orders}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="customer_name" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orders}">
          <mxGeometry y="130" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="customer_email" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orders}">
          <mxGeometry y="156" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="created_at" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orders}">
          <mxGeometry y="182" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Order Items table
        const orderItems = this.generateId();
        content += `        <mxCell id="${orderItems}" value="Order_Items" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="350" y="350" width="200" height="156" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${orderItems}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="order_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${orderItems}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="product_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${orderItems}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="quantity" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderItems}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="price" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderItems}">
          <mxGeometry y="130" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Cart Items table
        const cartItems = this.generateId();
        content += `        <mxCell id="${cartItems}" value="Cart_Items" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="650" y="350" width="200" height="130" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="id (PK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=4;" vertex="1" parent="${cartItems}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="user_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${cartItems}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="product_id (FK)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontStyle=2;" vertex="1" parent="${cartItems}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="quantity" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItems}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Relationships
        // Categories -> Products (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="${categories}" target="${products}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="550" y="115" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="650" y="160" as="geometry"/>
        </mxCell>
`;

        // Users -> Orders (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="${users}" target="${orders}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="150" y="232" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="150" y="350" as="geometry"/>
        </mxCell>
`;

        // Orders -> OrderItems (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="${orders}" target="${orderItems}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="250" y="454" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="350" y="428" as="geometry"/>
        </mxCell>
`;

        // Products -> OrderItems (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=0;exitY=1;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="${products}" target="${orderItems}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="650" y="310" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="550" y="428" as="geometry"/>
        </mxCell>
`;

        // Users -> CartItems (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=1;exitY=0.75;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="${users}" target="${cartItems}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="250" y="182" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="650" y="415" as="geometry"/>
        </mxCell>
`;

        // Products -> CartItems (One-to-Many)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="${products}" target="${cartItems}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;whiteSpace=wrap;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="750" y="310" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;whiteSpace=wrap;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="1">
          <mxGeometry x="750" y="350" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createClassDiagram() {
        this.cellCounter = 1;
        let content = '';

        // User class
        const userClass = this.generateId();
        content += `        <mxCell id="${userClass}" value="User" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="200" height="214" as="geometry"/>
        </mxCell>
`;

        // User attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- email: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="104" width="200" height="8" as="geometry"/>
        </mxCell>
`;

        // User methods
        content += `        <mxCell id="${this.generateId()}" value="+ register(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="112" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ login(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="138" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ logout(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="164" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ getOrders(): Order[]" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="190" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Product class
        const productClass = this.generateId();
        content += `        <mxCell id="${productClass}" value="Product" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="300" y="50" width="200" height="240" as="geometry"/>
        </mxCell>
`;

        // Product attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- price: decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="104" width="200" height="8" as="geometry"/>
        </mxCell>
`;

        // Product methods
        content += `        <mxCell id="${this.generateId()}" value="+ create(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="112" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ update(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="138" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ delete(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="164" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ getMainImage(): string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="190" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createSequenceDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Lifelines
        const user = this.generateId();
        content += `        <mxCell id="${user}" value="Користувач" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="80" y="80" width="100" height="400" as="geometry"/>
        </mxCell>
`;

        const ui = this.generateId();
        content += `        <mxCell id="${ui}" value="Веб-інтерфейс" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="240" y="80" width="100" height="400" as="geometry"/>
        </mxCell>
`;

        const controller = this.generateId();
        content += `        <mxCell id="${controller}" value="Контролер" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="400" y="80" width="100" height="400" as="geometry"/>
        </mxCell>
`;

        const model = this.generateId();
        content += `        <mxCell id="${model}" value="Модель" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="560" y="80" width="100" height="400" as="geometry"/>
        </mxCell>
`;

        const db = this.generateId();
        content += `        <mxCell id="${db}" value="База даних" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="720" y="80" width="100" height="400" as="geometry"/>
        </mxCell>
`;

        // Messages
        content += `        <mxCell id="${this.generateId()}" value="Додати в кошик" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="130" y="150" as="sourcePoint"/>
            <mxPoint x="290" y="150" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="POST /cart/add" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="290" y="180" as="sourcePoint"/>
            <mxPoint x="450" y="180" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="validate(data)" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="450" y="210" as="sourcePoint"/>
            <mxPoint x="610" y="210" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="save(cartItem)" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="610" y="240" as="sourcePoint"/>
            <mxPoint x="770" y="240" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="success" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="770" y="270" as="sourcePoint"/>
            <mxPoint x="610" y="270" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="redirect" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="450" y="300" as="sourcePoint"/>
            <mxPoint x="290" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="показати кошик" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;dashed=1;" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="290" y="330" as="sourcePoint"/>
            <mxPoint x="130" y="330" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        return content;
    }

    createActivityDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Start
        const start = this.generateId();
        content += `        <mxCell id="${start}" value="" style="ellipse;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="300" y="40" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Activities
        const browse = this.generateId();
        content += `        <mxCell id="${browse}" value="Переглядати товари" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="240" y="100" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        const select = this.generateId();
        content += `        <mxCell id="${select}" value="Вибрати товар" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="240" y="200" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Decision
        const decision = this.generateId();
        content += `        <mxCell id="${decision}" value="Авторизований?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="260" y="300" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const login = this.generateId();
        content += `        <mxCell id="${login}" value="Авторизуватись" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="80" y="310" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const addCart = this.generateId();
        content += `        <mxCell id="${addCart}" value="Додати в кошик" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="240" y="420" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        const checkout = this.generateId();
        content += `        <mxCell id="${checkout}" value="Оформити замовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="240" y="520" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // End
        const end = this.generateId();
        content += `        <mxCell id="${end}" value="" style="ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="300" y="620" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Arrows
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${start}" target="${browse}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${browse}" target="${select}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${select}" target="${decision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${decision}" target="${login}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${decision}" target="${addCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${login}" target="${addCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="200" y="370" as="sourcePoint"/>
            <mxPoint x="240" y="450" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${addCart}" target="${checkout}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${checkout}" target="${end}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createDFDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // External entities
        const userEntity = this.generateId();
        content += `        <mxCell id="${userEntity}" value="Користувач" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="150" width="100" height="60" as="geometry"/>
        </mxCell>
`;

        const adminEntity = this.generateId();
        content += `        <mxCell id="${adminEntity}" value="Адміністратор" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="350" width="100" height="60" as="geometry"/>
        </mxCell>
`;

        // Processes
        const authProcess = this.generateId();
        content += `        <mxCell id="${authProcess}" value="1.0&#xa;Автентифікація" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="250" y="80" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const catalogProcess = this.generateId();
        content += `        <mxCell id="${catalogProcess}" value="2.0&#xa;Управління каталогом" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="250" y="200" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const orderProcess = this.generateId();
        content += `        <mxCell id="${orderProcess}" value="3.0&#xa;Обробка замовлень" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="250" y="320" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Data stores
        const userStore = this.generateId();
        content += `        <mxCell id="${userStore}" value="D1 | Користувачі" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="450" y="80" width="150" height="40" as="geometry"/>
        </mxCell>
`;

        const productStore = this.generateId();
        content += `        <mxCell id="${productStore}" value="D2 | Товари" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="450" y="200" width="150" height="40" as="geometry"/>
        </mxCell>
`;

        const orderStore = this.generateId();
        content += `        <mxCell id="${orderStore}" value="D3 | Замовлення" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="450" y="320" width="150" height="40" as="geometry"/>
        </mxCell>
`;

        // Data flows
        content += `        <mxCell id="${this.generateId()}" value="Дані входу" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${userEntity}" target="${authProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Статус авторизації" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authProcess}" target="${userEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дані користувача" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authProcess}" target="${userStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${userEntity}" target="${catalogProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Список товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${catalogProcess}" target="${userEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${userEntity}" target="${orderProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createSADTDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Main function box
        const mainFunction = this.generateId();
        content += `        <mxCell id="${mainFunction}" value="Управління інтернет-магазином&#xa;ТехноСвіт&#xa;A0" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="300" y="200" width="200" height="100" as="geometry"/>
        </mxCell>
`;

        // Inputs (left side)
        content += `        <mxCell id="${this.generateId()}" value="Запити користувачів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" target="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="50" y="220" as="sourcePoint"/>
            <mxPoint x="300" y="220" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дані товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" target="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="50" y="250" as="sourcePoint"/>
            <mxPoint x="300" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" target="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="50" y="280" as="sourcePoint"/>
            <mxPoint x="300" y="280" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        // Outputs (right side)
        content += `        <mxCell id="${this.generateId()}" value="Каталог товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="220" as="sourcePoint"/>
            <mxPoint x="650" y="220" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Підтвердження замовлень" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="250" as="sourcePoint"/>
            <mxPoint x="650" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Звіти" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="280" as="sourcePoint"/>
            <mxPoint x="650" y="280" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        // Controls (top)
        content += `        <mxCell id="${this.generateId()}" value="Правила бізнес-логіки" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" target="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="100" as="sourcePoint"/>
            <mxPoint x="400" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Політики безпеки" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" target="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="350" y="100" as="sourcePoint"/>
            <mxPoint x="350" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        // Mechanisms (bottom)
        content += `        <mxCell id="${this.generateId()}" value="Laravel Framework" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="350" y="300" as="sourcePoint"/>
            <mxPoint x="350" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="База даних SQLite" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="400" y="300" as="sourcePoint"/>
            <mxPoint x="400" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Веб-сервер" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="450" y="300" as="sourcePoint"/>
            <mxPoint x="450" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        return content;
    }

    createBPMNDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Start event
        const startEvent = this.generateId();
        content += `        <mxCell id="${startEvent}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="80" y="140" width="40" height="40" as="geometry"/>
        </mxCell>
`;

        // User lane
        const userLane = this.generateId();
        content += `        <mxCell id="${userLane}" value="Користувач" style="swimlane;html=1;startSize=20;horizontal=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="40" y="80" width="800" height="120" as="geometry"/>
        </mxCell>
`;

        // System lane
        const systemLane = this.generateId();
        content += `        <mxCell id="${systemLane}" value="Система" style="swimlane;html=1;startSize=20;horizontal=0;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="40" y="200" width="800" height="120" as="geometry"/>
        </mxCell>
`;

        // Tasks
        const browseTask = this.generateId();
        content += `        <mxCell id="${browseTask}" value="Переглянути каталог" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${userLane}">
          <mxGeometry x="120" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        const selectTask = this.generateId();
        content += `        <mxCell id="${selectTask}" value="Вибрати товар" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${userLane}">
          <mxGeometry x="280" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        const addCartTask = this.generateId();
        content += `        <mxCell id="${addCartTask}" value="Додати в кошик" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${userLane}">
          <mxGeometry x="440" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        const validateTask = this.generateId();
        content += `        <mxCell id="${validateTask}" value="Перевірити дані" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${systemLane}">
          <mxGeometry x="200" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        const saveTask = this.generateId();
        content += `        <mxCell id="${saveTask}" value="Зберегти в БД" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${systemLane}">
          <mxGeometry x="360" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        const confirmTask = this.generateId();
        content += `        <mxCell id="${confirmTask}" value="Підтвердити" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="${systemLane}">
          <mxGeometry x="520" y="40" width="100" height="50" as="geometry"/>
        </mxCell>
`;

        // End event
        const endEvent = this.generateId();
        content += `        <mxCell id="${endEvent}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="720" y="140" width="40" height="40" as="geometry"/>
        </mxCell>
`;

        // Sequence flows
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${startEvent}" target="${browseTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${browseTask}" target="${selectTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${selectTask}" target="${addCartTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${addCartTask}" target="${validateTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${validateTask}" target="${saveTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${saveTask}" target="${confirmTask}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${confirmTask}" target="${endEvent}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    generateValidDiagrams() {
        console.log('🔧 Creating valid Draw.io XML file...');

        const diagrams = [
            {
                id: 'usecase',
                name: 'Діаграма прецедентів системи ТехноСвіт',
                content: this.createUseCaseDiagram()
            },
            {
                id: 'er',
                name: 'ER-діаграма бази даних системи',
                content: this.createERDiagram()
            },
            {
                id: 'class',
                name: 'Діаграма класів системи ТехноСвіт',
                content: this.createClassDiagram()
            },
            {
                id: 'sequence',
                name: 'Діаграма послідовності - Додавання в кошик',
                content: this.createSequenceDiagram()
            },
            {
                id: 'activity',
                name: 'Діаграма діяльності - Процес покупки',
                content: this.createActivityDiagram()
            },
            {
                id: 'dfd',
                name: 'DFD діаграма - Потоки даних системи',
                content: this.createDFDDiagram()
            },
            {
                id: 'sadt',
                name: 'SADT діаграма - Контекстна діаграма',
                content: this.createSADTDiagram()
            },
            {
                id: 'bpmn',
                name: 'BPMN діаграма - Бізнес-процес замовлення',
                content: this.createBPMNDiagram()
            }
        ];

        // Create valid XML structure
        const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2025-07-08T13:00:00.000Z" agent="FixedDrawioGenerator" etag="kosyanchuk_fixed" version="24.6.4" type="device" pages="${diagrams.length}">`;

        const xmlFooter = `</mxfile>`;

        let pagesXml = '';
        diagrams.forEach(diagram => {
            pagesXml += `  <diagram id="${diagram.id}" name="${this.escapeXml(diagram.name)}">
    <mxGraphModel dx="1422" dy="827" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${diagram.content}
      </root>
    </mxGraphModel>
  </diagram>
`;
        });

        const finalXml = xmlHeader + '\n' + pagesXml + xmlFooter;

        // Save to file
        const outputPath = path.join(__dirname, 'Kosyanchuk_Diagrams_Fixed.drawio');
        fs.writeFileSync(outputPath, finalXml, 'utf8');

        console.log(`✅ Valid diagram file created: ${outputPath}`);
        console.log('📊 Contains 8 complete diagrams:');
        diagrams.forEach((d, i) => {
            console.log(`   ${i + 1}. ${d.name}`);
        });

        return outputPath;
    }
}

// Generate the fixed diagrams
const generator = new FixedDiagramGenerator();
generator.generateValidDiagrams();
