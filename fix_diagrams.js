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
        content += `        <mxCell id="${systemBoundary}" value="Система інтернет-магазину ТехноСвіт" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#000000;strokeWidth=2;dashed=1;fontSize=16;fontStyle=1;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="160" y="40" width="700" height="680" as="geometry"/>
        </mxCell>
`;

        // Actors
        const visitor = this.generateId();
        content += `        <mxCell id="${visitor}" value="Відвідувач" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="150" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const user = this.generateId();
        content += `        <mxCell id="${user}" value="Зареєстрований\\nкористувач" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="320" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const admin = this.generateId();
        content += `        <mxCell id="${admin}" value="Адміністратор" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="520" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const paymentSystem = this.generateId();
        content += `        <mxCell id="${paymentSystem}" value="Платіжна\\nсистема" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="920" y="350" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        const emailService = this.generateId();
        content += `        <mxCell id="${emailService}" value="Email\\nсервіс" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="920" y="500" width="30" height="60" as="geometry"/>
        </mxCell>
`;

        // Use Cases - Visitor
        const catalog = this.generateId();
        content += `        <mxCell id="${catalog}" value="Перегляд каталогу\\nтоварів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="200" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const search = this.generateId();
        content += `        <mxCell id="${search}" value="Пошук товарів\\nза критеріями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="200" y="160" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const filter = this.generateId();
        content += `        <mxCell id="${filter}" value="Фільтрація товарів\\nза категоріями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="200" y="240" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const viewProduct = this.generateId();
        content += `        <mxCell id="${viewProduct}" value="Перегляд\\nдеталей товару" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="360" y="80" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // Registration and Authentication
        const register = this.generateId();
        content += `        <mxCell id="${register}" value="Реєстрація\\nнового користувача" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="360" y="160" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const login = this.generateId();
        content += `        <mxCell id="${login}" value="Авторизація\\nв системі" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="360" y="240" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const emailVerification = this.generateId();
        content += `        <mxCell id="${emailVerification}" value="Підтвердження\\nemail" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="520" y="160" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // User functions
        const cart = this.generateId();
        content += `        <mxCell id="${cart}" value="Управління\\nкошиком" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="200" y="340" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const addToCart = this.generateId();
        content += `        <mxCell id="${addToCart}" value="Додавання\\nв кошик" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="360" y="320" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const removeFromCart = this.generateId();
        content += `        <mxCell id="${removeFromCart}" value="Видалення\\nз кошика" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="360" y="390" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const updateQuantity = this.generateId();
        content += `        <mxCell id="${updateQuantity}" value="Зміна кількості\\nтоварів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="520" y="340" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // Order processing
        const placeOrder = this.generateId();
        content += `        <mxCell id="${placeOrder}" value="Оформлення\\nзамовлення" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="200" y="480" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const payment = this.generateId();
        content += `        <mxCell id="${payment}" value="Обробка\\nплатежу" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="360" y="480" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const orderHistory = this.generateId();
        content += `        <mxCell id="${orderHistory}" value="Перегляд історії\\nзамовлень" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="520" y="480" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const orderStatus = this.generateId();
        content += `        <mxCell id="${orderStatus}" value="Відстеження\\nстатусу замовлення" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="680" y="480" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // Admin functions
        const manageProducts = this.generateId();
        content += `        <mxCell id="${manageProducts}" value="Управління\\nтоварами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#cce5ff;strokeColor=#36393d;" vertex="1" parent="1">
          <mxGeometry x="200" y="600" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const manageCategories = this.generateId();
        content += `        <mxCell id="${manageCategories}" value="Управління\\nкатегоріями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#cce5ff;strokeColor=#36393d;" vertex="1" parent="1">
          <mxGeometry x="360" y="600" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const manageOrders = this.generateId();
        content += `        <mxCell id="${manageOrders}" value="Управління\\nзамовленнями" style="ellipse;whiteSpace=wrap;html=1;fillColor=#cce5ff;strokeColor=#36393d;" vertex="1" parent="1">
          <mxGeometry x="520" y="600" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const viewReports = this.generateId();
        content += `        <mxCell id="${viewReports}" value="Перегляд\\nзвітів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#cce5ff;strokeColor=#36393d;" vertex="1" parent="1">
          <mxGeometry x="680" y="600" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        const manageUsers = this.generateId();
        content += `        <mxCell id="${manageUsers}" value="Управління\\nкористувачами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#cce5ff;strokeColor=#36393d;" vertex="1" parent="1">
          <mxGeometry x="200" y="680" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // Include relationships
        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="${cart}" target="${addToCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="${cart}" target="${removeFromCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="${cart}" target="${updateQuantity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="${placeOrder}" target="${payment}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;include&gt;&gt;" style="endArrow=classic;html=1;rounded=0;dashed=1;" edge="1" parent="1" source="${register}" target="${emailVerification}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Actor connections - Visitor
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

        // Actor connections - User
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${login}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${cart}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${placeOrder}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${orderHistory}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${user}" target="${orderStatus}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // Actor connections - Admin
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

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${viewReports}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${admin}" target="${manageUsers}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // External system connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${paymentSystem}" target="${payment}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${emailService}" target="${emailVerification}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createERDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Users table
        const usersTable = this.generateId();
        content += `        <mxCell id="${usersTable}" value="USERS" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="180" height="240" as="geometry"/>
        </mxCell>
`;

        // Users table fields
        const usersTableFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'name', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'email', type: 'VARCHAR(255, UQ)', color: '#ffffff' },
            { name: 'email_verified_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'password', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'is_admin', type: 'BOOLEAN', color: '#ffffff' },
            { name: 'phone', type: 'VARCHAR(20)', color: '#ffffff' },
            { name: 'address', type: 'TEXT', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        usersTableFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${usersTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Categories table
        const categoriesTable = this.generateId();
        content += `        <mxCell id="${categoriesTable}" value="CATEGORIES" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="320" y="50" width="180" height="180" as="geometry"/>
        </mxCell>
`;

        const categoriesFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'name', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'description', type: 'TEXT', color: '#ffffff' },
            { name: 'image_url', type: 'VARCHAR(500)', color: '#ffffff' },
            { name: 'is_active', type: 'BOOLEAN', color: '#ffffff' },
            { name: 'sort_order', type: 'INT', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        categoriesFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoriesTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Products table
        const productsTable = this.generateId();
        content += `        <mxCell id="${productsTable}" value="PRODUCTS" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="590" y="50" width="180" height="280" as="geometry"/>
        </mxCell>
`;

        const productsFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'category_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'name', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'description', type: 'TEXT', color: '#ffffff' },
            { name: 'price', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'sale_price', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'stock_quantity', type: 'INT', color: '#ffffff' },
            { name: 'sku', type: 'VARCHAR(100, UQ)', color: '#ffffff' },
            { name: 'image_url', type: 'VARCHAR(500)', color: '#ffffff' },
            { name: 'official_image_url', type: 'VARCHAR(500)', color: '#ffffff' },
            { name: 'brand', type: 'VARCHAR(100)', color: '#ffffff' },
            { name: 'model', type: 'VARCHAR(100)', color: '#ffffff' },
            { name: 'is_active', type: 'BOOLEAN', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        productsFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productsTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Orders table
        const ordersTable = this.generateId();
        content += `        <mxCell id="${ordersTable}" value="ORDERS" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="50" y="370" width="180" height="260" as="geometry"/>
        </mxCell>
`;

        const ordersFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'user_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'order_number', type: 'VARCHAR(50, UQ)', color: '#ffffff' },
            { name: 'status', type: 'ENUM(pending,confirmed,processing,shipped,delivered,cancelled)', color: '#ffffff' },
            { name: 'total_amount', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'shipping_address', type: 'TEXT', color: '#ffffff' },
            { name: 'billing_address', type: 'TEXT', color: '#ffffff' },
            { name: 'phone', type: 'VARCHAR(20)', color: '#ffffff' },
            { name: 'email', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'payment_method', type: 'VARCHAR(50)', color: '#ffffff' },
            { name: 'payment_status', type: 'ENUM(pending,paid,failed,refunded)', color: '#ffffff' },
            { name: 'notes', type: 'TEXT', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        ordersFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${ordersTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Order_Items table
        const orderItemsTable = this.generateId();
        content += `        <mxCell id="${orderItemsTable}" value="ORDER_ITEMS" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="320" y="370" width="180" height="200" as="geometry"/>
        </mxCell>
`;

        const orderItemsFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'order_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'product_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'quantity', type: 'INT', color: '#ffffff' },
            { name: 'price', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'total', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'product_name', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'product_sku', type: 'VARCHAR(100)', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        orderItemsFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderItemsTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Cart_Items table
        const cartItemsTable = this.generateId();
        content += `        <mxCell id="${cartItemsTable}" value="CART_ITEMS" style="shape=table;startSize=30;container=1;collapsible=1;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="590" y="370" width="180" height="160" as="geometry"/>
        </mxCell>
`;

        const cartItemsFields = [
            { name: 'id', type: 'BIGINT(PK, AI)', color: '#ffcccc' },
            { name: 'user_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'product_id', type: 'BIGINT(FK)', color: '#ffffcc' },
            { name: 'quantity', type: 'INT', color: '#ffffff' },
            { name: 'price', type: 'DECIMAL(10,2)', color: '#ffffff' },
            { name: 'session_id', type: 'VARCHAR(255)', color: '#ffffff' },
            { name: 'created_at', type: 'TIMESTAMP', color: '#ffffff' },
            { name: 'updated_at', type: 'TIMESTAMP', color: '#ffffff' }
        ];

        cartItemsFields.forEach((field, index) => {
            const fieldId = this.generateId();
            content += `        <mxCell id="${fieldId}" value="${field.name}: ${field.type}" style="text;strokeColor=none;fillColor=${field.color};align=left;verticalAlign=middle;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemsTable}">
          <mxGeometry y="${30 + (index * 20)}" width="180" height="20" as="geometry"/>
        </mxCell>
`;
        });

        // Relationships with cardinality
        
        // Categories -> Products (1:N)
        content += `        <mxCell id="${this.generateId()}" value="1" style="endArrow=none;html=1;rounded=0;fontSize=12;fontStyle=1;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="140" as="sourcePoint"/>
            <mxPoint x="590" y="140" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="endArrow=none;html=1;rounded=0;fontSize=12;fontStyle=1;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="570" y="140" as="sourcePoint"/>
            <mxPoint x="590" y="140" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="140" as="sourcePoint"/>
            <mxPoint x="590" y="140" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        // Users(id) -> Orders(user_id) (1:N)
        content += `        <mxCell id="${this.generateId()}" value="id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="90" y="200" as="sourcePoint"/>
            <mxPoint x="90" y="380" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="user_id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="90" y="380" as="sourcePoint"/>
            <mxPoint x="110" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="75" y="205" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="75" y="360" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Orders(id) -> Order_Items(order_id) (1:N)
        content += `        <mxCell id="${this.generateId()}" value="id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="200" y="420" as="sourcePoint"/>
            <mxPoint x="320" y="470" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="order_id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="320" y="470" as="sourcePoint"/>
            <mxPoint x="340" y="480" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="205" y="425" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="300" y="475" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Products(id) -> Order_Items(product_id) (1:N)
        content += `        <mxCell id="${this.generateId()}" value="id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="590" y="250" as="sourcePoint"/>
            <mxPoint x="450" y="450" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="product_id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="450" y="450" as="sourcePoint"/>
            <mxPoint x="430" y="470" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="570" y="255" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="455" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Users(id) -> Cart_Items(user_id) (1:N)
        content += `        <mxCell id="${this.generateId()}" value="id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="200" as="sourcePoint"/>
            <mxPoint x="590" y="380" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="user_id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="590" y="380" as="sourcePoint"/>
            <mxPoint x="610" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="155" y="205" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="570" y="385" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Products(id) -> Cart_Items(product_id) (1:N)
        content += `        <mxCell id="${this.generateId()}" value="id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="680" y="250" as="sourcePoint"/>
            <mxPoint x="680" y="380" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="product_id" style="endArrow=none;html=1;rounded=0;fontSize=10;fontStyle=1;labelBackgroundColor=white;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="680" y="380" as="sourcePoint"/>
            <mxPoint x="700" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="665" y="255" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="N" style="text;html=1;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="665" y="365" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createClassDiagram() {
        this.cellCounter = 1;
        let content = '';

        // User Entity Class
        const userClass = this.generateId();
        content += `        <mxCell id="${userClass}" value="User" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#dae8fc;strokeColor=#6c8ebf;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="240" height="320" as="geometry"/>
        </mxCell>
`;

        // User Attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int {PK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="26" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="52" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- email: string {unique}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="78" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- password: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="104" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- isAdmin: boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="130" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- phone: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="156" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- address: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="182" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- created_at: timestamp" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="208" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator line
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#6c8ebf;" vertex="1" parent="${userClass}">
          <mxGeometry y="234" width="240" height="8" as="geometry"/>
        </mxCell>
`;

        // User Methods
        content += `        <mxCell id="${this.generateId()}" value="+ register(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="242" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ login(email, password): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="268" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateProfile(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userClass}">
          <mxGeometry y="294" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // Product Entity Class
        const productClass = this.generateId();
        content += `        <mxCell id="${productClass}" value="Product" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#ffe6cc;strokeColor=#d79b00;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="350" y="50" width="260" height="400" as="geometry"/>
        </mxCell>
`;

        // Product Attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int {PK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="26" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- category_id: int {FK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="52" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="78" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- description: text" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="104" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- price: decimal(10,2)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="130" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- stock_quantity: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="156" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- image_url: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="182" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- is_active: boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="208" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- created_at: timestamp" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="234" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#d79b00;" vertex="1" parent="${productClass}">
          <mxGeometry y="260" width="260" height="8" as="geometry"/>
        </mxCell>
`;

        // Product Methods
        content += `        <mxCell id="${this.generateId()}" value="+ updateStock(quantity: int): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="268" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updatePrice(newPrice: decimal): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="294" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ isInStock(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="320" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ activate(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="346" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ deactivate(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productClass}">
          <mxGeometry y="372" width="260" height="26" as="geometry"/>
        </mxCell>
`;

        // Category Entity Class
        const categoryClass = this.generateId();
        content += `        <mxCell id="${categoryClass}" value="Category" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#f8cecc;strokeColor=#b85450;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="680" y="50" width="220" height="200" as="geometry"/>
        </mxCell>
`;

        // Category Attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int {PK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="26" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string {unique}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="52" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- description: text" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="78" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- is_active: boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="104" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#b85450;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="130" width="220" height="8" as="geometry"/>
        </mxCell>
`;

        // Category Methods
        content += `        <mxCell id="${this.generateId()}" value="+ getProducts(): Product[]" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="138" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ activate(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="164" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Order Entity Class
        const orderClass = this.generateId();
        content += `        <mxCell id="${orderClass}" value="Order" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#e1d5e7;strokeColor=#9673a6;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="50" y="420" width="240" height="280" as="geometry"/>
        </mxCell>
`;

        // Order Attributes  
        content += `        <mxCell id="${this.generateId()}" value="- id: int {PK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="26" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- user_id: int {FK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="52" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- total_amount: decimal(10,2)" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="78" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- status: enum" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="104" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- shipping_address: text" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="130" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- created_at: timestamp" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="156" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#9673a6;" vertex="1" parent="${orderClass}">
          <mxGeometry y="182" width="240" height="8" as="geometry"/>
        </mxCell>
`;

        // Order Methods
        content += `        <mxCell id="${this.generateId()}" value="+ calculateTotal(): decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="190" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateStatus(status: string): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="216" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ cancel(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${orderClass}">
          <mxGeometry y="242" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // CartItem Entity Class
        const cartItemClass = this.generateId();
        content += `        <mxCell id="${cartItemClass}" value="CartItem" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#d5e8d4;strokeColor=#82b366;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="350" y="500" width="240" height="220" as="geometry"/>
        </mxCell>
`;

        // CartItem Attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int {PK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="26" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- user_id: int {FK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="52" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- product_id: int {FK}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="78" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- quantity: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="104" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- created_at: timestamp" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="130" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#82b366;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="156" width="240" height="8" as="geometry"/>
        </mxCell>
`;

        // CartItem Methods
        content += `        <mxCell id="${this.generateId()}" value="+ updateQuantity(qty: int): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="164" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ getSubtotal(): decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="190" width="240" height="26" as="geometry"/>
        </mxCell>
`;

        // UserController Class
        const userControllerClass = this.generateId();
        content += `        <mxCell id="${userControllerClass}" value="&lt;&lt;Controller&gt;&gt;\\nUserController" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=40;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#fff2cc;strokeColor=#d6b656;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="680" y="300" width="250" height="200" as="geometry"/>
        </mxCell>
`;

        // UserController Attributes
        content += `        <mxCell id="${this.generateId()}" value="- userService: UserService" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="40" width="250" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#d6b656;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="66" width="250" height="8" as="geometry"/>
        </mxCell>
`;

        // UserController Methods
        content += `        <mxCell id="${this.generateId()}" value="+ register(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="74" width="250" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ login(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="100" width="250" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ profile(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="126" width="250" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ logout(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="152" width="250" height="26" as="geometry"/>
        </mxCell>
`;

        // ProductController Class
        const productControllerClass = this.generateId();
        content += `        <mxCell id="${productControllerClass}" value="&lt;&lt;Controller&gt;&gt;\\nProductController" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=40;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#fff2cc;strokeColor=#d6b656;fontFamily=Helvetica;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="680" y="530" width="280" height="190" as="geometry"/>
        </mxCell>
`;

        // ProductController Attributes
        content += `        <mxCell id="${this.generateId()}" value="- productService: ProductService" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="40" width="280" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;strokeColor=#d6b656;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="66" width="280" height="8" as="geometry"/>
        </mxCell>
`;

        // ProductController Methods
        content += `        <mxCell id="${this.generateId()}" value="+ index(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="74" width="280" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ show(id: int): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="100" width="280" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ search(query: string): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="126" width="280" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ addToCart(productId: int): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontFamily=Helvetica;fontSize=11;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="152" width="280" height="26" as="geometry"/>
        </mxCell>
`;

        // RELATIONSHIPS
        // User -> Order (1:N)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1" source="${userClass}" target="${orderClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry">
            <mxPoint x="-10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry">
            <mxPoint x="10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        // User -> CartItem (1:N)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1" source="${userClass}" target="${cartItemClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry">
            <mxPoint x="-10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry">
            <mxPoint x="10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        // Category -> Product (1:N)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1" source="${categoryClass}" target="${productClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry">
            <mxPoint x="-10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry">
            <mxPoint x="10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        // Product -> CartItem (1:N)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;strokeWidth=2;strokeColor=#666666;" edge="1" parent="1" source="${productClass}" target="${cartItemClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry">
            <mxPoint x="-10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;fontFamily=Helvetica;fontSize=12;fontStyle=1;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry">
            <mxPoint x="10" y="-10" as="offset"/>
          </mxGeometry>
        </mxCell>
`;

        // UserController uses User (dependency)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=0;endSize=12;html=1;rounded=0;strokeWidth=1;strokeColor=#999999;dashed=1;" edge="1" parent="1" source="${userControllerClass}" target="${userClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;uses&gt;&gt;" style="resizable=0;html=1;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=10;fontStyle=2;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // ProductController uses Product (dependency)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=0;endSize=12;html=1;rounded=0;strokeWidth=1;strokeColor=#999999;dashed=1;" edge="1" parent="1" source="${productControllerClass}" target="${productClass}">
          <mxGeometry width="160" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;uses&gt;&gt;" style="resizable=0;html=1;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=10;fontStyle=2;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        return content;

        content += `        <mxCell id="${this.generateId()}" value="- address: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="182" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="208" width="220" height="8" as="geometry"/>
        </mxCell>
`;

        // User methods
        content += `        <mxCell id="${this.generateId()}" value="+ register(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="216" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ login(email, password): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="242" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ logout(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userClass}">
          <mxGeometry y="268" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Product class (enhanced)
        const productClass = this.generateId();
        content += `        <mxCell id="${productClass}" value="Product" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="320" y="50" width="220" height="350" as="geometry"/>
        </mxCell>
`;

        // Product attributes
        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="26" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- categoryId: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="52" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="78" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- description: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="104" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- price: decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="130" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- salePrice: decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="156" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- stockQuantity: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="182" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- sku: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="208" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- brand: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="234" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Separator
        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="260" width="220" height="8" as="geometry"/>
        </mxCell>
`;

        // Product methods
        content += `        <mxCell id="${this.generateId()}" value="+ create(data): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="268" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ update(data): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="294" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateStock(quantity): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productClass}">
          <mxGeometry y="320" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Category class (new)
        const categoryClass = this.generateId();
        content += `        <mxCell id="${categoryClass}" value="Category" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="590" y="50" width="200" height="190" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- name: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- description: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- isActive: boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="130" width="200" height="8" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ getProducts(): Product[]" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="138" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ activate(): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${categoryClass}">
          <mxGeometry y="164" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Order class (new)
        const orderClass = this.generateId();
        content += `        <mxCell id="${orderClass}" value="Order" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="50" y="400" width="220" height="280" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="26" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- userId: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="52" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- orderNumber: string" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="78" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- status: OrderStatus" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="104" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- totalAmount: decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="130" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- paymentStatus: PaymentStatus" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="156" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="182" width="220" height="8" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ calculateTotal(): decimal" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="190" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateStatus(status): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="216" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ processPayment(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${orderClass}">
          <mxGeometry y="242" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // CartItem class (new)
        const cartItemClass = this.generateId();
        content += `        <mxCell id="${cartItemClass}" value="CartItem" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="320" y="460" width="200" height="190" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- id: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- userId: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="52" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- productId: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="78" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- quantity: int" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="104" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="130" width="200" height="8" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ addToCart(): boolean" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="138" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateQuantity(qty): void" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${cartItemClass}">
          <mxGeometry y="164" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // Controller classes
        const userControllerClass = this.generateId();
        content += `        <mxCell id="${userControllerClass}" value="UserController" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="590" y="280" width="200" height="164" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- userService: UserService" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="26" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="52" width="200" height="8" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ register(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="60" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ login(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="86" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ profile(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="112" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateProfile(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${userControllerClass}">
          <mxGeometry y="138" width="200" height="26" as="geometry"/>
        </mxCell>
`;

        // ProductController class
        const productControllerClass = this.generateId();
        content += `        <mxCell id="${productControllerClass}" value="ProductController" style="swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="590" y="480" width="220" height="190" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="- productService: ProductService" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="26" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="52" width="220" height="8" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ index(request): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="60" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ show(id): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="86" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ search(criteria): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="112" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ filterByCategory(catId): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="138" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="+ updateStock(id, qty): Response" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${productControllerClass}">
          <mxGeometry y="164" width="220" height="26" as="geometry"/>
        </mxCell>
`;

        // Relationships
        // User has many Orders
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;" edge="1" parent="1" source="${userClass}" target="${orderClass}">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="160" y="370" as="sourcePoint"/>
            <mxPoint x="160" y="400" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry"/>
        </mxCell>
`;

        // Product belongs to Category
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;" edge="1" parent="1" source="${productClass}" target="${categoryClass}">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="540" y="200" as="sourcePoint"/>
            <mxPoint x="590" y="150" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry"/>
        </mxCell>
`;

        // User has many CartItems
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=open;endFill=1;endSize=12;html=1;rounded=0;" edge="1" parent="1" source="${userClass}" target="${cartItemClass}">
          <mxGeometry width="160" relative="1" as="geometry">
            <mxPoint x="270" y="300" as="sourcePoint"/>
            <mxPoint x="320" y="500" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="1" style="resizable=0;html=1;align=right;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 1}">
          <mxGeometry x="-1" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="*" style="resizable=0;html=1;align=left;verticalAlign=bottom;" connectable="0" vertex="1" parent="${this.cellCounter - 2}">
          <mxGeometry x="1" relative="1" as="geometry"/>
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
          <mxGeometry x="400" y="20" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // User opens website
        const openWebsite = this.generateId();
        content += `        <mxCell id="${openWebsite}" value="Відкрити веб-сайт\\nінтернет-магазину" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="340" y="60" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Browse categories
        const browseCategories = this.generateId();
        content += `        <mxCell id="${browseCategories}" value="Переглянути\\nкатегорії товарів" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="340" y="140" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Search decision
        const searchDecision = this.generateId();
        content += `        <mxCell id="${searchDecision}" value="Потрібен\\nпошук?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="360" y="220" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Search products
        const searchProducts = this.generateId();
        content += `        <mxCell id="${searchProducts}" value="Шукати товари\\nза критеріями" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="140" y="230" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Filter products
        const filterProducts = this.generateId();
        content += `        <mxCell id="${filterProducts}" value="Фільтрувати\\nтовари" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="540" y="230" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Select product
        const selectProduct = this.generateId();
        content += `        <mxCell id="${selectProduct}" value="Вибрати товар\\nдля перегляду" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="340" y="320" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // View product details
        const viewDetails = this.generateId();
        content += `        <mxCell id="${viewDetails}" value="Переглянути\\nдеталі товару" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="340" y="400" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Purchase decision
        const purchaseDecision = this.generateId();
        content += `        <mxCell id="${purchaseDecision}" value="Купити\\nтовар?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="360" y="480" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Check authorization
        const authDecision = this.generateId();
        content += `        <mxCell id="${authDecision}" value="Користувач\\nавторизований?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="360" y="580" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Register or login
        const registerLogin = this.generateId();
        content += `        <mxCell id="${registerLogin}" value="Зареєструватись\\nабо увійти" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="140" y="590" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Add to cart
        const addToCart = this.generateId();
        content += `        <mxCell id="${addToCart}" value="Додати товар\\nв кошик" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="340" y="680" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Continue shopping decision
        const continueDecision = this.generateId();
        content += `        <mxCell id="${continueDecision}" value="Продовжити\\nпокупки?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="360" y="760" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // View cart
        const viewCart = this.generateId();
        content += `        <mxCell id="${viewCart}" value="Переглянути\\nкошик" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="340" y="860" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Checkout process
        const checkout = this.generateId();
        content += `        <mxCell id="${checkout}" value="Перейти до\\nоформлення\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="340" y="940" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Fill shipping info
        const shippingInfo = this.generateId();
        content += `        <mxCell id="${shippingInfo}" value="Заповнити\\nдані доставки" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="340" y="1020" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Choose payment method
        const paymentMethod = this.generateId();
        content += `        <mxCell id="${paymentMethod}" value="Вибрати\\nспосіб оплати" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="340" y="1100" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Process payment
        const processPayment = this.generateId();
        content += `        <mxCell id="${processPayment}" value="Обробити\\nплатіж" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="340" y="1180" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Payment success decision
        const paymentDecision = this.generateId();
        content += `        <mxCell id="${paymentDecision}" value="Платіж\\nуспішний?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="360" y="1260" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Create order
        const createOrder = this.generateId();
        content += `        <mxCell id="${createOrder}" value="Створити\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="340" y="1360" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Send confirmation
        const sendConfirmation = this.generateId();
        content += `        <mxCell id="${sendConfirmation}" value="Надіслати\\nпідтвердження\\nна email" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="340" y="1440" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // Payment error
        const paymentError = this.generateId();
        content += `        <mxCell id="${paymentError}" value="Показати\\nпомилку оплати" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="540" y="1270" width="140" height="60" as="geometry"/>
        </mxCell>
`;

        // End success
        const endSuccess = this.generateId();
        content += `        <mxCell id="${endSuccess}" value="" style="ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="400" y="1520" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // End error (parallel end)
        const endError = this.generateId();
        content += `        <mxCell id="${endError}" value="" style="ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="600" y="1360" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Return to browsing
        const returnBrowse = this.generateId();
        content += `        <mxCell id="${returnBrowse}" value="" style="ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="600" y="520" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Flow connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${start}" target="${openWebsite}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${openWebsite}" target="${browseCategories}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${browseCategories}" target="${searchDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${searchDecision}" target="${searchProducts}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні, фільтр" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${searchDecision}" target="${filterProducts}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${searchProducts}" target="${selectProduct}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="280" y="290" as="sourcePoint"/>
            <mxPoint x="340" y="340" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${filterProducts}" target="${selectProduct}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="540" y="290" as="sourcePoint"/>
            <mxPoint x="480" y="340" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${selectProduct}" target="${viewDetails}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${viewDetails}" target="${purchaseDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${purchaseDecision}" target="${authDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${purchaseDecision}" target="${returnBrowse}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authDecision}" target="${registerLogin}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authDecision}" target="${addToCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${registerLogin}" target="${addToCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="280" y="650" as="sourcePoint"/>
            <mxPoint x="340" y="700" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${addToCart}" target="${continueDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${continueDecision}" target="${browseCategories}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="360" y="800" as="sourcePoint"/>
            <mxPoint x="200" y="170" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="200" y="800"/>
              <mxPoint x="200" y="170"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${continueDecision}" target="${viewCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${viewCart}" target="${checkout}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${checkout}" target="${shippingInfo}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${shippingInfo}" target="${paymentMethod}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentMethod}" target="${processPayment}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${processPayment}" target="${paymentDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentDecision}" target="${createOrder}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentDecision}" target="${paymentError}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${createOrder}" target="${sendConfirmation}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${sendConfirmation}" target="${endSuccess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentError}" target="${endError}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    createDFDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // External entities
        const customerEntity = this.generateId();
        content += `        <mxCell id="${customerEntity}" value="Клієнт" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="100" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const visitorEntity = this.generateId();
        content += `        <mxCell id="${visitorEntity}" value="Відвідувач" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="200" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const adminEntity = this.generateId();
        content += `        <mxCell id="${adminEntity}" value="Адміністратор" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="300" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const paymentEntity = this.generateId();
        content += `        <mxCell id="${paymentEntity}" value="Платіжна\\nсистема" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="650" y="450" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const supplierEntity = this.generateId();
        content += `        <mxCell id="${supplierEntity}" value="Постачальник" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="450" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        // Processes
        const authProcess = this.generateId();
        content += `        <mxCell id="${authProcess}" value="1.0\\nАвтентифікація\\nта авторизація" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="220" y="80" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const catalogProcess = this.generateId();
        content += `        <mxCell id="${catalogProcess}" value="2.0\\nУправління\\nкаталогом товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="220" y="200" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const searchProcess = this.generateId();
        content += `        <mxCell id="${searchProcess}" value="3.0\\nПошук та\\nфільтрація товарів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="370" y="150" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const cartProcess = this.generateId();
        content += `        <mxCell id="${cartProcess}" value="4.0\\nУправління\\nкошиком" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="370" y="280" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const orderProcess = this.generateId();
        content += `        <mxCell id="${orderProcess}" value="5.0\\nОбробка\\nзамовлень" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="520" y="320" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const paymentProcess = this.generateId();
        content += `        <mxCell id="${paymentProcess}" value="6.0\\nОбробка\\nплатежів" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="520" y="450" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const inventoryProcess = this.generateId();
        content += `        <mxCell id="${inventoryProcess}" value="7.0\\nУправління\\nтоварними запасами" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="220" y="420" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        const reportProcess = this.generateId();
        content += `        <mxCell id="${reportProcess}" value="8.0\\nЗвітність та\\nаналітика" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="370" y="420" width="100" height="80" as="geometry"/>
        </mxCell>
`;

        // Data stores
        const userStore = this.generateId();
        content += `        <mxCell id="${userStore}" value="D1 | Користувачі" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="350" y="50" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const productStore = this.generateId();
        content += `        <mxCell id="${productStore}" value="D2 | Товари" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="500" y="180" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const categoryStore = this.generateId();
        content += `        <mxCell id="${categoryStore}" value="D3 | Категорії" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="500" y="230" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const cartStore = this.generateId();
        content += `        <mxCell id="${cartStore}" value="D4 | Кошики" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="500" y="280" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const orderStore = this.generateId();
        content += `        <mxCell id="${orderStore}" value="D5 | Замовлення" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="650" y="320" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const orderItemStore = this.generateId();
        content += `        <mxCell id="${orderItemStore}" value="D6 | Елементи замовлень" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="650" y="370" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        const inventoryStore = this.generateId();
        content += `        <mxCell id="${inventoryStore}" value="D7 | Товарні запаси" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="350" y="520" width="120" height="30" as="geometry"/>
        </mxCell>
`;

        // Data flows from external entities to processes
        content += `        <mxCell id="${this.generateId()}" value="Дані для входу" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${customerEntity}" target="${authProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="125" as="sourcePoint"/>
            <mxPoint x="200" y="120" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Реєстраційні дані" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${visitorEntity}" target="${authProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="200" as="sourcePoint"/>
            <mxPoint x="200" y="150" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит на перегляд каталогу" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${visitorEntity}" target="${catalogProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Пошукові запити" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${visitorEntity}" target="${searchProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="225" as="sourcePoint"/>
            <mxPoint x="350" y="190" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дії з кошиком" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${customerEntity}" target="${cartProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="125" as="sourcePoint"/>
            <mxPoint x="350" y="320" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дані замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${customerEntity}" target="${orderProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="125" as="sourcePoint"/>
            <mxPoint x="500" y="360" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Управління товарами" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${adminEntity}" target="${catalogProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Управління запасами" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${adminEntity}" target="${inventoryProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="350" as="sourcePoint"/>
            <mxPoint x="200" y="460" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит звітів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${adminEntity}" target="${reportProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="350" as="sourcePoint"/>
            <mxPoint x="350" y="460" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дані постачання" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${supplierEntity}" target="${inventoryProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Data flows from processes to external entities
        content += `        <mxCell id="${this.generateId()}" value="Статус авторизації" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authProcess}" target="${customerEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Каталог товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${catalogProcess}" target="${visitorEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Результати пошуку" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${searchProcess}" target="${visitorEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="350" y="190" as="sourcePoint"/>
            <mxPoint x="150" y="225" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Інформація про кошик" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${cartProcess}" target="${customerEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="350" y="320" as="sourcePoint"/>
            <mxPoint x="150" y="125" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Підтвердження замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${customerEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="360" as="sourcePoint"/>
            <mxPoint x="150" y="125" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Звіти" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${reportProcess}" target="${adminEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="350" y="460" as="sourcePoint"/>
            <mxPoint x="150" y="350" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        // Data flows between processes and data stores
        content += `        <mxCell id="${this.generateId()}" value="Дані користувача" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${authProcess}" target="${userStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Інформація про товари" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${catalogProcess}" target="${productStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="320" y="240" as="sourcePoint"/>
            <mxPoint x="500" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Категорії товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${catalogProcess}" target="${categoryStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запити пошуку" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${searchProcess}" target="${productStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Елементи кошика" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${cartProcess}" target="${cartStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${orderStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Елементи замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${orderItemStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запаси товарів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${inventoryProcess}" target="${inventoryStore}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Payment system integration
        content += `        <mxCell id="${this.generateId()}" value="Запит на оплату" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentProcess}" target="${paymentEntity}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Результат оплати" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${paymentEntity}" target="${paymentProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Process connections
        content += `        <mxCell id="${this.generateId()}" value="Дані для замовлення" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${cartProcess}" target="${orderProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Платіжна інформація" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${paymentProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Оновлення запасів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${inventoryProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="520" y="400" as="sourcePoint"/>
            <mxPoint x="320" y="460" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Дані для звітів" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${orderProcess}" target="${reportProcess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="520" y="400" as="sourcePoint"/>
            <mxPoint x="420" y="460" as="targetPoint"/>
          </mxGeometry>
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

        // Customer Pool
        const customerPool = this.generateId();
        content += `        <mxCell id="${customerPool}" value="Клієнт" style="swimlane;html=1;childLayout=stackLayout;startSize=30;rounded=0;shadow=0;comic=0;labelBackgroundColor=none;strokeWidth=1;fontFamily=Verdana;fontSize=10;align=center;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1400" height="180" as="geometry"/>
        </mxCell>
`;

        // E-commerce System Pool
        const systemPool = this.generateId();
        content += `        <mxCell id="${systemPool}" value="Система інтернет-магазину ТехноСвіт" style="swimlane;html=1;childLayout=stackLayout;startSize=30;rounded=0;shadow=0;comic=0;labelBackgroundColor=none;strokeWidth=1;fontFamily=Verdana;fontSize=10;align=center;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="40" y="220" width="1400" height="200" as="geometry"/>
        </mxCell>
`;

        // Payment System Pool
        const paymentPool = this.generateId();
        content += `        <mxCell id="${paymentPool}" value="Платіжна система (LiqPay/WayForPay)" style="swimlane;html=1;childLayout=stackLayout;startSize=30;rounded=0;shadow=0;comic=0;labelBackgroundColor=none;strokeWidth=1;fontFamily=Verdana;fontSize=10;align=center;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="40" y="420" width="1400" height="140" as="geometry"/>
        </mxCell>
`;

        // Inventory System Pool
        const inventoryPool = this.generateId();
        content += `        <mxCell id="${inventoryPool}" value="Система управління складом" style="swimlane;html=1;childLayout=stackLayout;startSize=30;rounded=0;shadow=0;comic=0;labelBackgroundColor=none;strokeWidth=1;fontFamily=Verdana;fontSize=10;align=center;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="40" y="560" width="1400" height="140" as="geometry"/>
        </mxCell>
`;

        // Email Service Pool
        const emailPool = this.generateId();
        content += `        <mxCell id="${emailPool}" value="Email сервіс (SMTP)" style="swimlane;html=1;childLayout=stackLayout;startSize=30;rounded=0;shadow=0;comic=0;labelBackgroundColor=none;strokeWidth=1;fontFamily=Verdana;fontSize=10;align=center;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="40" y="700" width="1400" height="100" as="geometry"/>
        </mxCell>
`;

        // START EVENT
        const startEvent = this.generateId();
        content += `        <mxCell id="${startEvent}" value="Потреба в\\nтоварі" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;aspect=fixed;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="80" y="65" width="50" height="50" as="geometry"/>
        </mxCell>
`;

        // CUSTOMER ACTIVITIES
        const browseCatalog = this.generateId();
        content += `        <mxCell id="${browseCatalog}" value="Перегляд\\nкаталогу\\nтоварів" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="180" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const searchDecision = this.generateId();
        content += `        <mxCell id="${searchDecision}" value="Потрібен\\nпошук?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="300" y="65" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const searchProducts = this.generateId();
        content += `        <mxCell id="${searchProducts}" value="Пошук\\nтоварів\\nза критеріями" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="420" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const selectProduct = this.generateId();
        content += `        <mxCell id="${selectProduct}" value="Вибір\\nтовару" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="540" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const viewDetails = this.generateId();
        content += `        <mxCell id="${viewDetails}" value="Перегляд\\nдеталей\\nтовару" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="660" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const authCheck = this.generateId();
        content += `        <mxCell id="${authCheck}" value="Користувач\\nавторизований?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="780" y="65" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const loginRegister = this.generateId();
        content += `        <mxCell id="${loginRegister}" value="Авторизація/\\nРеєстрація" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="780" y="130" width="80" height="40" as="geometry"/>
        </mxCell>
`;

        const addToCart = this.generateId();
        content += `        <mxCell id="${addToCart}" value="Додавання\\nв кошик" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="900" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const continueShoppingGateway = this.generateId();
        content += `        <mxCell id="${continueShoppingGateway}" value="Продовжити\\nпокупки?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="1020" y="65" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const checkout = this.generateId();
        content += `        <mxCell id="${checkout}" value="Оформлення\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="1140" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const fillShippingInfo = this.generateId();
        content += `        <mxCell id="${fillShippingInfo}" value="Заповнення\\nданих\\nдоставки" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${customerPool}">
          <mxGeometry x="1260" y="60" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // SYSTEM ACTIVITIES
        const displayCatalog = this.generateId();
        content += `        <mxCell id="${displayCatalog}" value="Завантаження\\nі відображення\\nкаталогу" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="180" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const processSearch = this.generateId();
        content += `        <mxCell id="${processSearch}" value="Обробка\\nпошукового\\nзапиту" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="420" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const showProducts = this.generateId();
        content += `        <mxCell id="${showProducts}" value="Відображення\\nрезультатів\\nпошуку" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="540" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const showDetails = this.generateId();
        content += `        <mxCell id="${showDetails}" value="Завантаження\\nі показ\\nдеталей товару" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="660" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const validateAuth = this.generateId();
        content += `        <mxCell id="${validateAuth}" value="Перевірка\\nавторизації" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="780" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const processAuth = this.generateId();
        content += `        <mxCell id="${processAuth}" value="Обробка\\nавторизації/\\nреєстрації" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="780" y="130" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const updateCart = this.generateId();
        content += `        <mxCell id="${updateCart}" value="Оновлення\\nкошика\\nкористувача" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="900" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const calculateTotal = this.generateId();
        content += `        <mxCell id="${calculateTotal}" value="Розрахунок\\nвартості\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="1140" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const validateOrder = this.generateId();
        content += `        <mxCell id="${validateOrder}" value="Валідація\\nданих\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="1260" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // PAYMENT SYSTEM ACTIVITIES
        const processPayment = this.generateId();
        content += `        <mxCell id="${processPayment}" value="Обробка\\nплатежу" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${paymentPool}">
          <mxGeometry x="1140" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const validatePayment = this.generateId();
        content += `        <mxCell id="${validatePayment}" value="Валідація\\nплатіжних\\nданих" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${paymentPool}">
          <mxGeometry x="1260" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // INVENTORY SYSTEM ACTIVITIES
        const checkStock = this.generateId();
        content += `        <mxCell id="${checkStock}" value="Перевірка\\nналичності\\nтовару" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${inventoryPool}">
          <mxGeometry x="900" y="40" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const reserveProducts = this.generateId();
        content += `        <mxCell id="${reserveProducts}" value="Резервування\\nтоварів" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${inventoryPool}">
          <mxGeometry x="1140" y="40" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        const updateInventory = this.generateId();
        content += `        <mxCell id="${updateInventory}" value="Оновлення\\nкількості\\nна складі" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${inventoryPool}">
          <mxGeometry x="1260" y="40" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // EMAIL SERVICE ACTIVITIES
        const sendConfirmation = this.generateId();
        content += `        <mxCell id="${sendConfirmation}" value="Відправка\\nпідтвердження\\nзамовлення" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;shadow=1;" vertex="1" parent="${emailPool}">
          <mxGeometry x="1260" y="30" width="80" height="40" as="geometry"/>
        </mxCell>
`;

        // GATEWAYS AND EVENTS
        const paymentSuccess = this.generateId();
        content += `        <mxCell id="${paymentSuccess}" value="Платіж\\nуспішний?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;shadow=1;" vertex="1" parent="${paymentPool}">
          <mxGeometry x="80" y="55" width="80" height="50" as="geometry"/>
        </mxCell>
`;

        const createOrderEvent = this.generateId();
        content += `        <mxCell id="${createOrderEvent}" value="Замовлення\\nстворено" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;aspect=fixed;shadow=1;" vertex="1" parent="${systemPool}">
          <mxGeometry x="200" y="135" width="50" height="50" as="geometry"/>
        </mxCell>
`;

        const orderRejectedEvent = this.generateId();
        content += `        <mxCell id="${orderRejectedEvent}" value="Замовлення\\nвідхилено" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;aspect=fixed;shadow=1;" vertex="1" parent="${paymentPool}">
          <mxGeometry x="200" y="55" width="50" height="50" as="geometry"/>
        </mxCell>
`;

        const endEvent = this.generateId();
        content += `        <mxCell id="${endEvent}" value="Процес\\nзавершено" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;fontColor=#ffffff;aspect=fixed;shadow=1;" vertex="1" parent="${emailPool}">
          <mxGeometry x="80" y="35" width="50" height="50" as="geometry"/>
        </mxCell>
`;

        // SEQUENCE FLOWS
        // Customer flow
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${startEvent}" target="${browseCatalog}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${browseCatalog}" target="${searchDecision}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${searchDecision}" target="${searchProducts}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${searchDecision}" target="${selectProduct}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="340" y="120" as="sourcePoint"/>
            <mxPoint x="540" y="90" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="340" y="140"/>
              <mxPoint x="580" y="140"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${searchProducts}" target="${selectProduct}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${selectProduct}" target="${viewDetails}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${viewDetails}" target="${authCheck}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${authCheck}" target="${loginRegister}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${loginRegister}" target="${addToCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="860" y="150" as="sourcePoint"/>
            <mxPoint x="900" y="90" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${authCheck}" target="${addToCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${addToCart}" target="${continueShoppingGateway}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${continueShoppingGateway}" target="${browseCatalog}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="1020" y="90" as="sourcePoint"/>
            <mxPoint x="260" y="90" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1060" y="20"/>
              <mxPoint x="220" y="20"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${continueShoppingGateway}" target="${checkout}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${checkout}" target="${fillShippingInfo}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // MESSAGE FLOWS (between pools)
        content += `        <mxCell id="${this.generateId()}" value="Запит каталогу" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${browseCatalog}" target="${displayCatalog}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит пошуку" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${searchProducts}" target="${processSearch}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Результати пошуку" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${showProducts}" target="${selectProduct}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит деталей" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${viewDetails}" target="${showDetails}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Перевірка авторизації" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${authCheck}" target="${validateAuth}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Авторизація" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${loginRegister}" target="${processAuth}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Додавання товару" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${addToCart}" target="${updateCart}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Перевірка наявності" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${updateCart}" target="${checkStock}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Розрахунок суми" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${checkout}" target="${calculateTotal}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Валідація замовлення" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${fillShippingInfo}" target="${validateOrder}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Резервування товарів" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${calculateTotal}" target="${reserveProducts}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Запит на оплату" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${validateOrder}" target="${processPayment}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Валідація платежу" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${processPayment}" target="${validatePayment}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Результат платежу" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${validatePayment}" target="${paymentSuccess}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="1300" y="480" as="sourcePoint"/>
            <mxPoint x="160" y="480" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1300" y="380"/>
              <mxPoint x="120" y="380"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Так" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${paymentSuccess}" target="${createOrderEvent}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="120" y="420" as="sourcePoint"/>
            <mxPoint x="225" y="380" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Ні" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${paymentSuccess}" target="${orderRejectedEvent}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="160" y="480" as="sourcePoint"/>
            <mxPoint x="225" y="480" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Оновлення складу" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${createOrderEvent}" target="${updateInventory}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="250" y="380" as="sourcePoint"/>
            <mxPoint x="1300" y="660" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="225" y="320"/>
              <mxPoint x="1300" y="320"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="Відправка підтвердження" style="endArrow=classic;html=1;rounded=0;strokeWidth=1;strokeColor=#666666;dashed=1;" edge="1" parent="1" source="${updateInventory}" target="${sendConfirmation}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${sendConfirmation}" target="${endEvent}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="1260" y="750" as="sourcePoint"/>
            <mxPoint x="130" y="750" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1300" y="780"/>
              <mxPoint x="105" y="780"/>
            </Array>
          </mxGeometry>
        </mxCell>
`;

        // ERROR FLOWS
        content += `        <mxCell id="${this.generateId()}" value="Помилка платежу" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;strokeColor=#ff0000;" edge="1" parent="1" source="${orderRejectedEvent}" target="${endEvent}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="225" y="480" as="sourcePoint"/>
            <mxPoint x="105" y="750" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="20" y="480"/>
              <mxPoint x="20" y="760"/>
              <mxPoint x="105" y="760"/>
            </Array>
          </mxGeometry>
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
