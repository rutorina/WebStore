/**
 * Draw.io Diagram Generator for Kosyanchuk Project
 * Generates all required diagrams programmatically in draw.io XML format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base XML template for draw.io
const drawioTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2025-07-08T12:00:00.000Z" agent="DrawioGenerator" etag="kosyanchuk" version="24.6.4" type="device" pages="9">
  {pages}
</mxfile>`;

const pageTemplate = `<diagram id="{id}" name="{name}">
    <mxGraphModel dx="1422" dy="827" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        {content}
      </root>
    </mxGraphModel>
  </diagram>`;

class DrawioDiagramGenerator {
    constructor() {
        this.pages = [];
        this.cellId = 2; // Start after root cells 0 and 1
    }

    // Utility to get next cell ID
    getNextId() {
        return this.cellId++;
    }

    // Create a basic shape
    createShape(x, y, width, height, text, style = '') {
        const id = this.getNextId();
        return `<mxCell id="${id}" value="${this.escapeXml(text)}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>
        </mxCell>`;
    }

    // Create an actor (Use Case diagram)
    createActor(x, y, text) {
        const style = "shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;";
        return this.createShape(x, y, 30, 60, text, style);
    }

    // Create a use case
    createUseCase(x, y, width, text) {
        const style = "ellipse;whiteSpace=wrap;html=1;";
        return this.createShape(x, y, width, 60, text, style);
    }

    // Create a connection
    createConnection(sourceId, targetId, text = '') {
        const id = this.getNextId();
        return `<mxCell id="${id}" value="${this.escapeXml(text)}" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${sourceId}" target="${targetId}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>`;
    }

    // Create a class box
    createClass(x, y, width, className, attributes, methods) {
        const style = "swimlane;fontStyle=1;align=center;verticalAlign=top;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;";
        
        let content = `<mxCell id="${this.getNextId()}" value="${className}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${width}" height="${26 + attributes.length * 20 + methods.length * 20 + 20}" as="geometry"/>
        </mxCell>`;

        // Add attributes
        attributes.forEach(attr => {
            content += `<mxCell id="${this.getNextId()}" value="${this.escapeXml(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${this.cellId - attributes.length - methods.length - 2}">
              <mxGeometry y="26" width="${width}" height="20" as="geometry"/>
            </mxCell>`;
        });

        // Add separator
        content += `<mxCell id="${this.getNextId()}" value="" style="line;strokeWidth=1;fillColor=none;align=left;verticalAlign=middle;spacingTop=-1;spacingLeft=3;spacingRight=3;rotatable=0;labelPosition=right;points=[];portConstraint=eastwest;" vertex="1" parent="${this.cellId - attributes.length - methods.length - 3}">
          <mxGeometry y="${26 + attributes.length * 20}" width="${width}" height="8" as="geometry"/>
        </mxCell>`;

        // Add methods
        methods.forEach(method => {
            content += `<mxCell id="${this.getNextId()}" value="${this.escapeXml(method)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;" vertex="1" parent="${this.cellId - methods.length - 4}">
              <mxGeometry y="${26 + attributes.length * 20 + 8}" width="${width}" height="20" as="geometry"/>
            </mxCell>`;
        });

        return content;
    }

    // Create ER entity
    createEntity(x, y, width, entityName, attributes) {
        const style = "swimlane;fontStyle=0;childLayout=stackLayout;horizontal=1;startSize=26;horizontalStack=0;resizeParent=1;resizeParentMax=0;resizeLast=0;collapsible=1;marginBottom=0;align=center;fontSize=14;";
        
        let content = `<mxCell id="${this.getNextId()}" value="${entityName}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${width}" height="${26 + attributes.length * 26}" as="geometry"/>
        </mxCell>`;

        attributes.forEach((attr, index) => {
            const isPK = attr.includes('PK');
            const isFK = attr.includes('FK');
            let attrStyle = "text;strokeColor=none;fillColor=none;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;fontSize=12;";
            
            if (isPK) attrStyle += "fontStyle=4;"; // Bold and underline for PK
            if (isFK) attrStyle += "fontStyle=2;"; // Italic for FK
            
            content += `<mxCell id="${this.getNextId()}" value="${this.escapeXml(attr)}" style="${attrStyle}" vertex="1" parent="${this.cellId - attributes.length - 2 + index}">
              <mxGeometry y="${26 + index * 26}" width="${width}" height="26" as="geometry"/>
            </mxCell>`;
        });

        return content;
    }

    // Escape XML special characters
    escapeXml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Generate Use Case Diagram
    generateUseCaseDiagram() {
        let content = '';
        
        // Actors
        const visitorId = this.getNextId();
        content += this.createActor(50, 150, 'Відвідувач');
        
        const userId = this.getNextId();
        content += this.createActor(50, 300, 'Зареєстрований\nкористувач');
        
        const adminId = this.getNextId();
        content += this.createActor(50, 450, 'Адміністратор');

        // Use Cases
        const useCases = [
            { x: 250, y: 100, width: 120, text: 'Перегляд каталогу' },
            { x: 250, y: 180, width: 120, text: 'Пошук товарів' },
            { x: 250, y: 260, width: 120, text: 'Фільтрація' },
            { x: 400, y: 180, width: 120, text: 'Реєстрація' },
            { x: 400, y: 260, width: 120, text: 'Авторизація' },
            { x: 400, y: 340, width: 120, text: 'Додавання в кошик' },
            { x: 550, y: 260, width: 120, text: 'Оформлення замовлення' },
            { x: 550, y: 340, width: 120, text: 'Історія замовлень' },
            { x: 250, y: 400, width: 120, text: 'Управління товарами' },
            { x: 250, y: 480, width: 120, text: 'Управління категоріями' },
            { x: 400, y: 400, width: 120, text: 'Управління замовленнями' }
        ];

        useCases.forEach(uc => {
            content += this.createUseCase(uc.x, uc.y, uc.width, uc.text);
        });

        this.pages.push({
            id: 'usecase',
            name: 'Діаграма прецедентів системи ТехноСвіт',
            content: content
        });
    }

    // Generate ER Diagram
    generateERDiagram() {
        let content = '';

        // Users Entity
        content += this.createEntity(50, 50, 200, 'Users', [
            'id (PK, INT)',
            'name (VARCHAR)',
            'email (VARCHAR, UNIQUE)',
            'password (VARCHAR)',
            'is_admin (BOOLEAN)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        // Categories Entity
        content += this.createEntity(300, 50, 200, 'Categories', [
            'id (PK, INT)',
            'name_uk (VARCHAR)',
            'name_en (VARCHAR)',
            'slug (VARCHAR, UNIQUE)',
            'description_uk (TEXT)',
            'description_en (TEXT)',
            'is_active (BOOLEAN)',
            'sort_order (INT)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        // Products Entity
        content += this.createEntity(550, 50, 200, 'Products', [
            'id (PK, INT)',
            'category_id (FK, INT)',
            'name_uk (VARCHAR)',
            'name_en (VARCHAR)',
            'price (DECIMAL)',
            'quantity (INT)',
            'images (JSON)',
            'is_active (BOOLEAN)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        // Orders Entity
        content += this.createEntity(50, 350, 200, 'Orders', [
            'id (PK, INT)',
            'user_id (FK, INT)',
            'total_amount (DECIMAL)',
            'status (ENUM)',
            'customer_name (VARCHAR)',
            'shipping_address (TEXT)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        // Order Items Entity
        content += this.createEntity(300, 350, 200, 'Order_Items', [
            'id (PK, INT)',
            'order_id (FK, INT)',
            'product_id (FK, INT)',
            'quantity (INT)',
            'price (DECIMAL)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        // Cart Items Entity
        content += this.createEntity(550, 350, 200, 'Cart_Items', [
            'id (PK, INT)',
            'user_id (FK, INT)',
            'product_id (FK, INT)',
            'quantity (INT)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ]);

        this.pages.push({
            id: 'er',
            name: 'ER-діаграма бази даних системи',
            content: content
        });
    }

    // Generate Class Diagram
    generateClassDiagram() {
        let content = '';

        // User Class
        content += this.createClass(50, 50, 200, 'User', [
            '- id: int',
            '- name: string',
            '- email: string',
            '- password: string',
            '- is_admin: boolean'
        ], [
            '+ register(): boolean',
            '+ login(): boolean',
            '+ logout(): void',
            '+ updateProfile(): boolean',
            '+ getOrders(): Order[]'
        ]);

        // Category Class
        content += this.createClass(300, 50, 200, 'Category', [
            '- id: int',
            '- name_uk: string',
            '- name_en: string',
            '- slug: string',
            '- is_active: boolean'
        ], [
            '+ create(): boolean',
            '+ update(): boolean',
            '+ delete(): boolean',
            '+ getProducts(): Product[]',
            '+ isActive(): boolean'
        ]);

        // Product Class
        content += this.createClass(550, 50, 200, 'Product', [
            '- id: int',
            '- category_id: int',
            '- name_uk: string',
            '- price: decimal',
            '- quantity: int',
            '- images: array'
        ], [
            '+ create(): boolean',
            '+ update(): boolean',
            '+ delete(): boolean',
            '+ getCategory(): Category',
            '+ isInStock(): boolean',
            '+ getMainImage(): string'
        ]);

        this.pages.push({
            id: 'class',
            name: 'Діаграма класів системи ТехноСвіт',
            content: content
        });
    }

    // Generate all diagrams and save to file
    generateAll() {
        console.log('🔧 Generating diagrams programmatically...');
        
        this.generateUseCaseDiagram();
        this.generateERDiagram();
        this.generateClassDiagram();

        // Add placeholders for other diagrams
        const otherDiagrams = [
            { id: 'activity', name: 'Діаграма діяльності - Процес оформлення замовлення' },
            { id: 'sequence', name: 'Діаграма послідовності - Додавання товару в кошик' },
            { id: 'bpmn', name: 'BPMN діаграма - Бізнес-процес управління замовленнями' },
            { id: 'dfd', name: 'DFD - Діаграма потоків даних рівень 0' },
            { id: 'sadt', name: 'SADT діаграма - Контекстна діаграма системи' },
            { id: 'architecture', name: 'Архітектурна діаграма системи ТехноСвіт' }
        ];

        otherDiagrams.forEach(diagram => {
            this.pages.push({
                id: diagram.id,
                name: diagram.name,
                content: this.createShape(100, 100, 300, 100, `${diagram.name}\n\n(Створіть цю діаграму відповідно до опису в DIAGRAMS_KOSYANCHUK.md)`, 'rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;')
            });
        });

        // Generate XML content
        const pagesXml = this.pages.map(page => 
            pageTemplate
                .replace('{id}', page.id)
                .replace('{name}', page.name)
                .replace('{content}', page.content)
        ).join('\n');

        const finalXml = drawioTemplate.replace('{pages}', pagesXml);

        // Save to file
        const outputPath = path.join(__dirname, 'Kosyanchuk_Diagrams.drawio');
        fs.writeFileSync(outputPath, finalXml, 'utf8');

        console.log(`✅ Diagrams generated successfully: ${outputPath}`);
        console.log('📋 Next steps:');
        console.log('1. Open the .drawio file in draw.io (app.diagrams.net)');
        console.log('2. Complete the remaining diagrams using the descriptions in DIAGRAMS_KOSYANCHUK.md');
        console.log('3. Customize and beautify the generated diagrams');
    }
}

// Generate diagrams
const generator = new DrawioDiagramGenerator();
generator.generateAll();
