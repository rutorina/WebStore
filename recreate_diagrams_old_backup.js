/**
 * Comprehensive Draw.io Diagram Generator v3.0
 * Створює детальні діаграми для структурно-функціонального та об'єктно-орієнтованого аналізу системи
 * Creates detailed diagrams for structural-functional and object-oriented system analysis
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComprehensiveDiagramGenerator {
    constructor() {
        this.cellCounter = 0;
    }

    generateId() {
        return `id_${++this.cellCounter}`;
    }

    escapeXml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    escapeXmlAttribute(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/\n/g, '&#10;')
            .replace(/\r/g, '&#13;')
            .replace(/\t/g, '&#9;');
    }

    // 1. FDD - Діаграма функціональної декомпозиції (Function Decomposition Diagram)
    createFDDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Основна функція системи
        const mainFunction = {
            id: this.generateId(),
            x: 200, y: 50,
            width: 300, height: 80,
            text: 'Система електронного\\nмагазину ТехноСвіт'
        };

        content += `        <mxCell id="${mainFunction.id}" value="${this.escapeXmlAttribute(mainFunction.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=14;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${mainFunction.x}" y="${mainFunction.y}" width="${mainFunction.width}" height="${mainFunction.height}" as="geometry"/>
        </mxCell>
`;

        // Функції першого рівня
        const level1Functions = [
            { id: this.generateId(), x: 50, y: 200, text: 'Управління\\nкористувачами' },
            { id: this.generateId(), x: 200, y: 200, text: 'Управління\\nкаталогом' },
            { id: this.generateId(), x: 350, y: 200, text: 'Обробка\\nзамовлень' },
            { id: this.generateId(), x: 500, y: 200, text: 'Адміністрування\\nсистеми' }
        ];

        level1Functions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="120" height="80" as="geometry"/>
        </mxCell>
`;
            // Зв'язок з основною функцією
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainFunction.id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Функції другого рівня для "Управління користувачами"
        const userManagementFunctions = [
            { id: this.generateId(), x: 20, y: 350, text: 'Реєстрація\\nкористувачів' },
            { id: this.generateId(), x: 20, y: 450, text: 'Автентифікація' },
            { id: this.generateId(), x: 20, y: 550, text: 'Управління\\nпрофілем' }
        ];

        userManagementFunctions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${level1Functions[0].id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Функції другого рівня для "Управління каталогом"
        const catalogFunctions = [
            { id: this.generateId(), x: 170, y: 350, text: 'Перегляд\\nтоварів' },
            { id: this.generateId(), x: 170, y: 450, text: 'Пошук та\\nфільтрація' },
            { id: this.generateId(), x: 170, y: 550, text: 'Управління\\nкатегоріями' }
        ];

        catalogFunctions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${level1Functions[1].id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Функції другого рівня для "Обробка замовлень"
        const orderFunctions = [
            { id: this.generateId(), x: 320, y: 350, text: 'Додавання\\nв кошик' },
            { id: this.generateId(), x: 320, y: 450, text: 'Оформлення\\nзамовлення' },
            { id: this.generateId(), x: 320, y: 550, text: 'Відстеження\\nстатусу' }
        ];

        orderFunctions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${level1Functions[2].id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Функції другого рівня для "Адміністрування системи"
        const adminFunctions = [
            { id: this.generateId(), x: 470, y: 350, text: 'Управління\\nкористувачами' },
            { id: this.generateId(), x: 470, y: 450, text: 'Аналітика та\\nзвітність' },
            { id: this.generateId(), x: 470, y: 550, text: 'Налаштування\\nсистеми' }
        ];

        adminFunctions.forEach(func => {
            content += `        <mxCell id="${func.id}" value="${this.escapeXmlAttribute(func.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${func.x}" y="${func.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${level1Functions[3].id}" target="${func.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // 2. SADT - Діаграма структурного аналізу та проектування (SADT/IDEF0)
    createSADTDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Основний процес A0
        const mainProcess = {
            id: this.generateId(),
            x: 300, y: 250,
            width: 200, height: 100,
            text: 'A0\\n\\nОбробка замовлень\\nв електронному\\nмагазині'
        };

        content += `        <mxCell id="${mainProcess.id}" value="${this.escapeXmlAttribute(mainProcess.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${mainProcess.x}" y="${mainProcess.y}" width="${mainProcess.width}" height="${mainProcess.height}" as="geometry"/>
        </mxCell>
`;

        // Вхідні дані (Input)
        const inputs = [
            { id: this.generateId(), x: 50, y: 270, text: 'Запит клієнта' },
            { id: this.generateId(), x: 50, y: 310, text: 'Дані товарів' }
        ];

        inputs.forEach((input, index) => {
            content += `        <mxCell id="${input.id}" value="${this.escapeXmlAttribute(input.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${input.x}" y="${input.y}" width="80" height="20" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${input.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Вихідні дані (Output)
        const outputs = [
            { id: this.generateId(), x: 650, y: 270, text: 'Підтверджене\\nзамовлення' },
            { id: this.generateId(), x: 650, y: 310, text: 'Рахунок' }
        ];

        outputs.forEach((output, index) => {
            content += `        <mxCell id="${output.id}" value="${this.escapeXmlAttribute(output.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${output.x}" y="${output.y}" width="80" height="30" as="geometry"/>
        </mxCell>
`;
            // Стрілка від процесу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mainProcess.id}" target="${output.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Управління (Control)
        const controls = [
            { id: this.generateId(), x: 350, y: 150, text: 'Політика\\nкомпанії' },
            { id: this.generateId(), x: 450, y: 150, text: 'Правила\\nоплати' }
        ];

        controls.forEach((control, index) => {
            content += `        <mxCell id="${control.id}" value="${this.escapeXmlAttribute(control.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${control.x}" y="${control.y}" width="60" height="30" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу зверху
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${control.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Механізми (Mechanisms)
        const mechanisms = [
            { id: this.generateId(), x: 320, y: 400, text: 'Персонал' },
            { id: this.generateId(), x: 400, y: 400, text: 'CRM система' },
            { id: this.generateId(), x: 480, y: 400, text: 'База даних' }
        ];

        mechanisms.forEach((mechanism, index) => {
            content += `        <mxCell id="${mechanism.id}" value="${this.escapeXmlAttribute(mechanism.text)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${mechanism.x}" y="${mechanism.y}" width="70" height="20" as="geometry"/>
        </mxCell>
`;
            // Стрілка до процесу знизу
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${mechanism.id}" target="${mainProcess.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Деталізація процесу A0 на A1-A4
        const subProcesses = [
            { id: this.generateId(), x: 100, y: 500, text: 'A1\\nОтримання\\nзапиту' },
            { id: this.generateId(), x: 250, y: 500, text: 'A2\\nПеревірка\\nналяності' },
            { id: this.generateId(), x: 400, y: 500, text: 'A3\\nОформлення\\nзамовлення' },
            { id: this.generateId(), x: 550, y: 500, text: 'A4\\nОплата та\\nдоставка' }
        ];

        subProcesses.forEach((subProcess, index) => {
            content += `        <mxCell id="${subProcess.id}" value="${this.escapeXmlAttribute(subProcess.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${subProcess.x}" y="${subProcess.y}" width="120" height="80" as="geometry"/>
        </mxCell>
`;
            // Зв'язки між підпроцесами
            if (index < subProcesses.length - 1) {
                content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${subProcess.id}" target="${subProcesses[index + 1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
            }
        });

        return content;
    }
    // 3. DFD - Діаграма потоків даних (Data Flow Diagram) - рівень 0 та 1
    createDFDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Контекстна діаграма (рівень 0)
        const centralProcess = {
            id: this.generateId(),
            x: 400, y: 300,
            width: 180, height: 120,
            text: '0\\n\\nСистема\\nелектронного\\nмагазину\\nТехноСвіт'
        };

        content += `        <mxCell id="${centralProcess.id}" value="${this.escapeXmlAttribute(centralProcess.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${centralProcess.x}" y="${centralProcess.y}" width="${centralProcess.width}" height="${centralProcess.height}" as="geometry"/>
        </mxCell>
`;

        // Зовнішні сутності
        const externalEntities = [
            { id: this.generateId(), x: 80, y: 100, text: 'Клієнт' },
            { id: this.generateId(), x: 80, y: 200, text: 'Адміністратор' },
            { id: this.generateId(), x: 80, y: 400, text: 'Постачальник' },
            { id: this.generateId(), x: 720, y: 150, text: 'Платіжна\\nсистема' },
            { id: this.generateId(), x: 720, y: 300, text: 'Email\\nсервіс' },
            { id: this.generateId(), x: 720, y: 450, text: 'Служба\\nдоставки' }
        ];

        externalEntities.forEach(entity => {
            content += `        <mxCell id="${entity.id}" value="${this.escapeXmlAttribute(entity.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${entity.x}" y="${entity.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Сховища даних
        const dataStores = [
            { id: this.generateId(), x: 200, y: 650, text: 'D1\\nКористувачі' },
            { id: this.generateId(), x: 320, y: 650, text: 'D2\\nТовари' },
            { id: this.generateId(), x: 440, y: 650, text: 'D3\\nЗамовлення' },
            { id: this.generateId(), x: 560, y: 650, text: 'D4\\nКошики' },
            { id: this.generateId(), x: 200, y: 50, text: 'D5\\nСесії' },
            { id: this.generateId(), x: 320, y: 50, text: 'D6\\nЛоги' },
            { id: this.generateId(), x: 440, y: 50, text: 'D7\\nНалаштування' }
        ];

        dataStores.forEach(store => {
            content += `        <mxCell id="${store.id}" value="${this.escapeXmlAttribute(store.text)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#f5f5f5;strokeColor=#666666;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${store.x}" y="${store.y}" width="100" height="40" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки даних від зовнішніх сутностей до системи
        const inputFlows = [
            { from: externalEntities[0].id, to: centralProcess.id, label: 'Запити каталогу,\\nзамовлення', x: 250, y: 220 },
            { from: externalEntities[1].id, to: centralProcess.id, label: 'Команди\\nуправління', x: 250, y: 280 },
            { from: externalEntities[2].id, to: centralProcess.id, label: 'Оновлення\\nтоварів', x: 250, y: 450 },
            { from: externalEntities[3].id, to: centralProcess.id, label: 'Результат\\nоплати', x: 620, y: 220 },
            { from: externalEntities[5].id, to: centralProcess.id, label: 'Статус\\nдоставки', x: 620, y: 420 }
        ];

        inputFlows.forEach(flow => {
            const labelId = this.generateId();
            content += `        <mxCell id="${labelId}" value="${this.escapeXmlAttribute(flow.label)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=9;" vertex="1" parent="1">
          <mxGeometry x="${flow.x}" y="${flow.y}" width="80" height="30" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки даних від системи до зовнішніх сутностей
        const outputFlows = [
            { from: centralProcess.id, to: externalEntities[0].id, label: 'Каталог товарів,\\nпідтвердження', x: 250, y: 180 },
            { from: centralProcess.id, to: externalEntities[1].id, label: 'Звіти,\\nстатистика', x: 250, y: 240 },
            { from: centralProcess.id, to: externalEntities[3].id, label: 'Запити\\nоплати', x: 620, y: 180 },
            { from: centralProcess.id, to: externalEntities[4].id, label: 'Email\\nсповіщення', x: 620, y: 300 },
            { from: centralProcess.id, to: externalEntities[5].id, label: 'Замовлення\\nна доставку', x: 620, y: 380 }
        ];

        outputFlows.forEach(flow => {
            const labelId = this.generateId();
            content += `        <mxCell id="${labelId}" value="${this.escapeXmlAttribute(flow.label)}" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=9;" vertex="1" parent="1">
          <mxGeometry x="${flow.x}" y="${flow.y}" width="80" height="30" as="geometry"/>
        </mxCell>
`;
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Потоки даних між системою та сховищами
        const dataFlows = [
            { from: centralProcess.id, to: dataStores[0].id, label: 'Дані\\nкористувачів' },
            { from: centralProcess.id, to: dataStores[1].id, label: 'Дані\\nтоварів' },
            { from: centralProcess.id, to: dataStores[2].id, label: 'Дані\\nзамовлень' },
            { from: centralProcess.id, to: dataStores[3].id, label: 'Дані\\nкошиків' }
        ];

        dataFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;startArrow=classic;html=1;rounded=0;fontSize=9;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // 4. ER - Розширена діаграма сутність-зв'язок (Enhanced Entity-Relationship Diagram)
    createERDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Users Entity
        const usersEntity = {
            id: this.generateId(),
            x: 50, y: 50,
            width: 220, height: 260
        };

        content += `        <mxCell id="${usersEntity.id}" value="Users (Користувачі)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${usersEntity.x}" y="${usersEntity.y}" width="${usersEntity.width}" height="${usersEntity.height}" as="geometry"/>
        </mxCell>
`;
        
        const userAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'name (VARCHAR(100), NOT NULL)',
            'email (VARCHAR(150), UNIQUE, NOT NULL)',
            'email_verified_at (TIMESTAMP)',
            'password (VARCHAR(255), NOT NULL)',
            'is_admin (BOOLEAN, DEFAULT FALSE)',
            'phone (VARCHAR(20))',
            'address (TEXT)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        userAttributes.forEach((attr, index) => {
            const style = attr.includes('PK') ? 'fontStyle=4;' : '';
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=10;" vertex="1" parent="${usersEntity.id}">
          <mxGeometry y="${26 + index * 23}" width="${usersEntity.width}" height="23" as="geometry"/>
        </mxCell>
`;
        });

        // Categories Entity
        const categoriesEntity = {
            id: this.generateId(),
            x: 320, y: 50,
            width: 240, height: 280
        };

        content += `        <mxCell id="${categoriesEntity.id}" value="Categories (Категорії)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${categoriesEntity.x}" y="${categoriesEntity.y}" width="${categoriesEntity.width}" height="${categoriesEntity.height}" as="geometry"/>
        </mxCell>
`;

        const categoryAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'name_uk (VARCHAR(100), NOT NULL)',
            'name_en (VARCHAR(100), NOT NULL)',
            'slug (VARCHAR(150), UNIQUE, NOT NULL)',
            'description_uk (TEXT)',
            'description_en (TEXT)',
            'image_url (VARCHAR(255))',
            'parent_id (FK → Categories.id)',
            'sort_order (INT, DEFAULT 0)',
            'is_active (BOOLEAN, DEFAULT TRUE)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        categoryAttributes.forEach((attr, index) => {
            let style = '';
            if (attr.includes('PK')) style = 'fontStyle=4;';
            else if (attr.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=10;" vertex="1" parent="${categoriesEntity.id}">
          <mxGeometry y="${26 + index * 21}" width="${categoriesEntity.width}" height="21" as="geometry"/>
        </mxCell>
`;
        });

        // Products Entity
        const productsEntity = {
            id: this.generateId(),
            x: 600, y: 50,
            width: 260, height: 420
        };

        content += `        <mxCell id="${productsEntity.id}" value="Products (Товари)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${productsEntity.x}" y="${productsEntity.y}" width="${productsEntity.width}" height="${productsEntity.height}" as="geometry"/>
        </mxCell>
`;

        const productAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'category_id (FK → Categories.id)',
            'name_uk (VARCHAR(200), NOT NULL)',
            'name_en (VARCHAR(200), NOT NULL)',
            'slug (VARCHAR(250), UNIQUE, NOT NULL)',
            'description_uk (TEXT)',
            'description_en (TEXT)',
            'price (DECIMAL(10,2), NOT NULL)',
            'sale_price (DECIMAL(10,2))',
            'stock_quantity (INT, DEFAULT 0)',
            'sku (VARCHAR(100), UNIQUE)',
            'weight (DECIMAL(8,2))',
            'dimensions (VARCHAR(100))',
            'brand (VARCHAR(100))',
            'model (VARCHAR(100))',
            'warranty_months (INT)',
            'is_active (BOOLEAN, DEFAULT TRUE)',
            'is_featured (BOOLEAN, DEFAULT FALSE)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        productAttributes.forEach((attr, index) => {
            let style = '';
            if (attr.includes('PK')) style = 'fontStyle=4;';
            else if (attr.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=9;" vertex="1" parent="${productsEntity.id}">
          <mxGeometry y="${26 + index * 19}" width="${productsEntity.width}" height="19" as="geometry"/>
        </mxCell>
`;
        });

        // Orders Entity
        const ordersEntity = {
            id: this.generateId(),
            x: 50, y: 350,
            width: 240, height: 320
        };

        content += `        <mxCell id="${ordersEntity.id}" value="Orders (Замовлення)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f8cecc;strokeColor=#b85450;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${ordersEntity.x}" y="${ordersEntity.y}" width="${ordersEntity.width}" height="${ordersEntity.height}" as="geometry"/>
        </mxCell>
`;

        const orderAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'user_id (FK → Users.id)',
            'order_number (VARCHAR(50), UNIQUE)',
            'status (ENUM: pending, confirmed, shipped, delivered, cancelled)',
            'total_amount (DECIMAL(10,2), NOT NULL)',
            'shipping_cost (DECIMAL(8,2))',
            'tax_amount (DECIMAL(8,2))',
            'discount_amount (DECIMAL(8,2))',
            'payment_method (VARCHAR(50))',
            'payment_status (ENUM: pending, paid, failed, refunded)',
            'shipping_address (JSON)',
            'billing_address (JSON)',
            'notes (TEXT)',
            'shipped_at (TIMESTAMP)',
            'delivered_at (TIMESTAMP)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        orderAttributes.forEach((attr, index) => {
            let style = '';
            if (attr.includes('PK')) style = 'fontStyle=4;';
            else if (attr.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=9;" vertex="1" parent="${ordersEntity.id}">
          <mxGeometry y="${26 + index * 17}" width="${ordersEntity.width}" height="17" as="geometry"/>
        </mxCell>
`;
        });

        // Order Items Entity
        const orderItemsEntity = {
            id: this.generateId(),
            x: 320, y: 380,
            width: 240, height: 220
        };

        content += `        <mxCell id="${orderItemsEntity.id}" value="Order_Items (Позиції замовлення)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${orderItemsEntity.x}" y="${orderItemsEntity.y}" width="${orderItemsEntity.width}" height="${orderItemsEntity.height}" as="geometry"/>
        </mxCell>
`;

        const orderItemAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'order_id (FK → Orders.id)',
            'product_id (FK → Products.id)',
            'quantity (INT, NOT NULL)',
            'unit_price (DECIMAL(10,2), NOT NULL)',
            'total_price (DECIMAL(10,2), NOT NULL)',
            'product_snapshot (JSON)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        orderItemAttributes.forEach((attr, index) => {
            let style = '';
            if (attr.includes('PK')) style = 'fontStyle=4;';
            else if (attr.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=10;" vertex="1" parent="${orderItemsEntity.id}">
          <mxGeometry y="${26 + index * 21}" width="${orderItemsEntity.width}" height="21" as="geometry"/>
        </mxCell>
`;
        });

        // Shopping Carts Entity
        const cartsEntity = {
            id: this.generateId(),
            x: 600, y: 500,
            width: 240, height: 200
        };

        content += `        <mxCell id="${cartsEntity.id}" value="Shopping_Carts (Кошики)" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="${cartsEntity.x}" y="${cartsEntity.y}" width="${cartsEntity.width}" height="${cartsEntity.height}" as="geometry"/>
        </mxCell>
`;

        const cartAttributes = [
            'id (PK, INT, AUTO_INCREMENT)',
            'user_id (FK → Users.id)',
            'product_id (FK → Products.id)',
            'quantity (INT, NOT NULL)',
            'added_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        cartAttributes.forEach((attr, index) => {
            let style = '';
            if (attr.includes('PK')) style = 'fontStyle=4;';
            else if (attr.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(attr)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}fontSize=10;" vertex="1" parent="${cartsEntity.id}">
          <mxGeometry y="${26 + index * 28}" width="${cartsEntity.width}" height="28" as="geometry"/>
        </mxCell>
`;
        });

        // Relationships with cardinality
        // Users (1) → Orders (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="1" source="${usersEntity.id}" target="${ordersEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="150" y="320" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="500" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Categories (1) → Products (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="${categoriesEntity.id}" target="${productsEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="570" y="180" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="580" y="180" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Orders (1) → Order_Items (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="${ordersEntity.id}" target="${orderItemsEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="300" y="490" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="300" y="510" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Products (1) → Order_Items (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;exitX=0;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="1" source="${productsEntity.id}" target="${orderItemsEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="580" y="450" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="570" y="480" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Users (1) → Shopping_Carts (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="1" source="${usersEntity.id}" target="${cartsEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="280" y="300" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="580" y="580" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Products (1) → Shopping_Carts (M)
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="1" source="${productsEntity.id}" target="${cartsEntity.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="710" y="480" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="710" y="500" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        return content;
    }
        this.cellCounter = 1; // Reset for each diagram
        let content = '';

        // Actors
        const actors = [
            { id: this.generateId(), x: 50, y: 150, text: 'Відвідувач' },
            { id: this.generateId(), x: 50, y: 300, text: 'Зареєстрований\\nкористувач' },
            { id: this.generateId(), x: 50, y: 450, text: 'Адміністратор' }
        ];

        actors.forEach(actor => {
            content += `        <mxCell id="${actor.id}" value="${this.escapeXmlAttribute(actor.text)}" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="${actor.x}" y="${actor.y}" width="30" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Use Cases
        const useCases = [
            { id: this.generateId(), x: 200, y: 100, text: 'Перегляд каталогу' },
            { id: this.generateId(), x: 200, y: 180, text: 'Пошук товарів' },
            { id: this.generateId(), x: 200, y: 260, text: 'Фільтрація товарів' },
            { id: this.generateId(), x: 380, y: 180, text: 'Реєстрація' },
            { id: this.generateId(), x: 380, y: 260, text: 'Авторизація' },
            { id: this.generateId(), x: 380, y: 340, text: 'Додавання в кошик' },
            { id: this.generateId(), x: 560, y: 260, text: 'Оформлення\\nзамовлення' },
            { id: this.generateId(), x: 560, y: 340, text: 'Історія замовлень' },
            { id: this.generateId(), x: 200, y: 420, text: 'Управління\\nтоварами' },
            { id: this.generateId(), x: 200, y: 500, text: 'Управління\\nкатегоріями' },
            { id: this.generateId(), x: 380, y: 420, text: 'Управління\\nзамовленнями' }
        ];

        useCases.forEach(uc => {
            content += `        <mxCell id="${uc.id}" value="${this.escapeXmlAttribute(uc.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="${uc.x}" y="${uc.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Connections
        const connections = [
            { from: actors[0].id, to: useCases[0].id, text: '' },
            { from: actors[0].id, to: useCases[1].id, text: '' },
            { from: actors[0].id, to: useCases[2].id, text: '' },
            { from: actors[0].id, to: useCases[3].id, text: '' },
            { from: actors[1].id, to: useCases[4].id, text: '' },
            { from: actors[1].id, to: useCases[5].id, text: '' },
            { from: actors[1].id, to: useCases[6].id, text: '' },
            { from: actors[1].id, to: useCases[7].id, text: '' },
            { from: actors[2].id, to: useCases[8].id, text: '' },
            { from: actors[2].id, to: useCases[9].id, text: '' },
            { from: actors[2].id, to: useCases[10].id, text: '' }
        ];

        connections.forEach(conn => {
            content += `        <mxCell id="${this.generateId()}" value="${conn.text}" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${conn.from}" target="${conn.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Add extends relationship
        content += `        <mxCell id="${this.generateId()}" value="&amp;lt;&amp;lt;extends&amp;gt;&amp;gt;" style="endArrow=open;dashed=1;html=1;dashPattern=1 3;strokeWidth=2;" edge="1" parent="1" source="${actors[1].id}" target="${actors[0].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="100" y="250" as="sourcePoint"/>
            <mxPoint x="100" y="200" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;

    // 5. Use Case - Діаграма прецедентів (Enhanced Use Case Diagram)
    createUseCaseDiagram() {
        this.cellCounter = 1; // Reset for each diagram
        let content = '';

        // Actors
        const actors = [
            { id: this.generateId(), x: 50, y: 120, text: 'Незареєстрований\\nвідвідувач' },
            { id: this.generateId(), x: 50, y: 280, text: 'Зареєстрований\\nкористувач' },
            { id: this.generateId(), x: 50, y: 440, text: 'Адміністратор' },
            { id: this.generateId(), x: 750, y: 200, text: 'Платіжна\\nсистема' },
            { id: this.generateId(), x: 750, y: 320, text: 'Email\\nсервіс' }
        ];

        actors.forEach(actor => {
            content += `        <mxCell id="${actor.id}" value="${this.escapeXmlAttribute(actor.text)}" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${actor.x}" y="${actor.y}" width="40" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Use Cases - Базові функції
        const basicUseCases = [
            { id: this.generateId(), x: 200, y: 80, text: 'Перегляд каталогу\\nтоварів' },
            { id: this.generateId(), x: 200, y: 160, text: 'Пошук товарів' },
            { id: this.generateId(), x: 200, y: 240, text: 'Фільтрація\\nза категоріями' },
            { id: this.generateId(), x: 350, y: 120, text: 'Перегляд деталей\\nтовару' },
            { id: this.generateId(), x: 350, y: 200, text: 'Порівняння\\nтоварів' }
        ];

        basicUseCases.forEach(uc => {
            content += `        <mxCell id="${uc.id}" value="${this.escapeXmlAttribute(uc.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${uc.x}" y="${uc.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Use Cases - Функції зареєстрованих користувачів
        const userUseCases = [
            { id: this.generateId(), x: 350, y: 280, text: 'Реєстрація\\nкористувача' },
            { id: this.generateId(), x: 350, y: 360, text: 'Авторизація\\nв системі' },
            { id: this.generateId(), x: 500, y: 220, text: 'Додавання\\nв кошик' },
            { id: this.generateId(), x: 500, y: 300, text: 'Управління\\nкошиком' },
            { id: this.generateId(), x: 500, y: 380, text: 'Оформлення\\nзамовлення' },
            { id: this.generateId(), x: 650, y: 280, text: 'Історія\\nзамовлень' },
            { id: this.generateId(), x: 650, y: 360, text: 'Управління\\nпрофілем' }
        ];

        userUseCases.forEach(uc => {
            content += `        <mxCell id="${uc.id}" value="${this.escapeXmlAttribute(uc.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${uc.x}" y="${uc.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Use Cases - Адміністративні функції
        const adminUseCases = [
            { id: this.generateId(), x: 200, y: 450, text: 'Управління\\nтоварами' },
            { id: this.generateId(), x: 200, y: 530, text: 'Управління\\nкатегоріями' },
            { id: this.generateId(), x: 350, y: 470, text: 'Управління\\nкористувачами' },
            { id: this.generateId(), x: 350, y: 550, text: 'Перегляд\\nзамовлень' },
            { id: this.generateId(), x: 500, y: 480, text: 'Генерація\\nзвітів' },
            { id: this.generateId(), x: 500, y: 560, text: 'Налаштування\\nсистеми' }
        ];

        adminUseCases.forEach(uc => {
            content += `        <mxCell id="${uc.id}" value="${this.escapeXmlAttribute(uc.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${uc.x}" y="${uc.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // System boundary
        content += `        <mxCell id="${this.generateId()}" value="Система електронного магазину ТехноСвіт" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#000000;strokeWidth=2;dashed=1;fontSize=14;fontStyle=1;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="180" y="60" width="500" height="540" as="geometry"/>
        </mxCell>
`;

        // Connections - Basic functionality for all users
        const basicConnections = [
            { from: actors[0].id, to: basicUseCases[0].id },
            { from: actors[0].id, to: basicUseCases[1].id },
            { from: actors[0].id, to: basicUseCases[2].id },
            { from: actors[0].id, to: basicUseCases[3].id },
            { from: actors[0].id, to: basicUseCases[4].id }
        ];

        basicConnections.forEach(conn => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${conn.from}" target="${conn.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Connections - Registered user functionality
        const userConnections = [
            { from: actors[1].id, to: userUseCases[0].id },
            { from: actors[1].id, to: userUseCases[1].id },
            { from: actors[1].id, to: userUseCases[2].id },
            { from: actors[1].id, to: userUseCases[3].id },
            { from: actors[1].id, to: userUseCases[4].id },
            { from: actors[1].id, to: userUseCases[5].id },
            { from: actors[1].id, to: userUseCases[6].id }
        ];

        userConnections.forEach(conn => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${conn.from}" target="${conn.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Connections - Admin functionality
        const adminConnections = [
            { from: actors[2].id, to: adminUseCases[0].id },
            { from: actors[2].id, to: adminUseCases[1].id },
            { from: actors[2].id, to: adminUseCases[2].id },
            { from: actors[2].id, to: adminUseCases[3].id },
            { from: actors[2].id, to: adminUseCases[4].id },
            { from: actors[2].id, to: adminUseCases[5].id }
        ];

        adminConnections.forEach(conn => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${conn.from}" target="${conn.to}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // External system connections
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${userUseCases[4].id}" target="${actors[3].id}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${userUseCases[4].id}" target="${actors[4].id}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
`;

        // Inheritance relationships
        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;extends&gt;&gt;" style="endArrow=open;dashed=1;html=1;dashPattern=5 5;strokeWidth=2;fontSize=10;" edge="1" parent="1" source="${actors[1].id}" target="${actors[0].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="&lt;&lt;extends&gt;&gt;" style="endArrow=open;dashed=1;html=1;dashPattern=5 5;strokeWidth=2;fontSize=10;" edge="1" parent="1" source="${actors[2].id}" target="${actors[1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    // 6. BPMN - Детальна діаграма бізнес-процесів (Business Process Model and Notation)
    createBPMNDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Pools (учасники процесу)
        const customerPool = {
            id: this.generateId(),
            x: 50, y: 50,
            width: 800, height: 200,
            text: 'Клієнт'
        };

        const systemPool = {
            id: this.generateId(),
            x: 50, y: 270,
            width: 800, height: 250,
            text: 'Система електронного магазину'
        };

        const paymentPool = {
            id: this.generateId(),
            x: 50, y: 540,
            width: 800, height: 150,
            text: 'Платіжна система'
        };

        // Create pools
        [customerPool, systemPool, paymentPool].forEach(pool => {
            content += `        <mxCell id="${pool.id}" value="${this.escapeXmlAttribute(pool.text)}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;horizontal=0;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${pool.x}" y="${pool.y}" width="${pool.width}" height="${pool.height}" as="geometry"/>
        </mxCell>
`;
        });

        // Customer lane events and activities
        const customerStartEvent = {
            id: this.generateId(),
            x: 120, y: 130,
            text: 'Потреба в\\nтоварі'
        };

        content += `        <mxCell id="${customerStartEvent.id}" value="${this.escapeXmlAttribute(customerStartEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="${customerPool.id}">
          <mxGeometry x="70" y="80" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        const customerActivities = [
            { id: this.generateId(), x: 220, y: 130, text: 'Пошук\\nтоварів' },
            { id: this.generateId(), x: 320, y: 130, text: 'Вибір\\nтовару' },
            { id: this.generateId(), x: 420, y: 130, text: 'Додавання\\nв кошик' },
            { id: this.generateId(), x: 520, y: 130, text: 'Оформлення\\nзамовлення' },
            { id: this.generateId(), x: 720, y: 130, text: 'Отримання\\nтовару' }
        ];

        customerActivities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=10;" vertex="1" parent="${customerPool.id}">
          <mxGeometry x="${activity.x - customerPool.x}" y="80" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Customer end event
        const customerEndEvent = {
            id: this.generateId(),
            x: 820, y: 130,
            text: 'Завершення\\nпокупки'
        };

        content += `        <mxCell id="${customerEndEvent.id}" value="${this.escapeXmlAttribute(customerEndEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="${customerPool.id}">
          <mxGeometry x="770" y="80" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        // System lane activities
        const systemActivities = [
            { id: this.generateId(), x: 170, y: 340, text: 'Відображення\\nкаталогу' },
            { id: this.generateId(), x: 270, y: 340, text: 'Показ деталей\\nтовару' },
            { id: this.generateId(), x: 370, y: 340, text: 'Управління\\nкошиком' },
            { id: this.generateId(), x: 470, y: 340, text: 'Валідація\\nзамовлення' },
            { id: this.generateId(), x: 570, y: 340, text: 'Створення\\nзамовлення' },
            { id: this.generateId(), x: 670, y: 340, text: 'Підготовка\\nдо відправки' },
            { id: this.generateId(), x: 770, y: 340, text: 'Оновлення\\nстатусу' }
        ];

        systemActivities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=10;" vertex="1" parent="${systemPool.id}">
          <mxGeometry x="${activity.x - systemPool.x}" y="70" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Decision gateway - payment method
        const paymentGateway = {
            id: this.generateId(),
            x: 620, y: 380,
            text: 'Метод\\nоплати?'
        };

        content += `        <mxCell id="${paymentGateway.id}" value="${this.escapeXmlAttribute(paymentGateway.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=9;" vertex="1" parent="${systemPool.id}">
          <mxGeometry x="570" y="150" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // Payment system activities
        const paymentActivities = [
            { id: this.generateId(), x: 570, y: 600, text: 'Обробка\\nоплати' },
            { id: this.generateId(), x: 670, y: 600, text: 'Підтвердження\\nплатежу' }
        ];

        paymentActivities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="${paymentPool.id}">
          <mxGeometry x="${activity.x - paymentPool.x}" y="50" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Sequence flows within customer pool
        for (let i = 0; i < customerActivities.length - 1; i++) {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${i === 0 ? customerStartEvent.id : customerActivities[i-1].id}" target="${customerActivities[i].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        }

        // Connect last customer activity to end event
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${customerActivities[customerActivities.length - 1].id}" target="${customerEndEvent.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Sequence flows within system pool
        for (let i = 0; i < systemActivities.length - 2; i++) {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${systemActivities[i].id}" target="${systemActivities[i + 1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        }

        // Connect to payment gateway
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${systemActivities[4].id}" target="${paymentGateway.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Gateway to payment system
        content += `        <mxCell id="${this.generateId()}" value="Онлайн оплата" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;fontSize=9;" edge="1" parent="1" source="${paymentGateway.id}" target="${paymentActivities[0].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Payment flow
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${paymentActivities[0].id}" target="${paymentActivities[1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Return to system
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${paymentActivities[1].id}" target="${systemActivities[5].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Gateway to cash payment
        content += `        <mxCell id="${this.generateId()}" value="Готівка при отриманні" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;fontSize=9;" edge="1" parent="1" source="${paymentGateway.id}" target="${systemActivities[5].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Final system flow
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${systemActivities[5].id}" target="${systemActivities[6].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        // Message flows (cross-pool communication)
        const messageFlows = [
            { from: customerActivities[0].id, to: systemActivities[0].id, label: 'Запит каталогу' },
            { from: customerActivities[1].id, to: systemActivities[1].id, label: 'Запит деталей' },
            { from: customerActivities[2].id, to: systemActivities[2].id, label: 'Додати в кошик' },
            { from: customerActivities[3].id, to: systemActivities[3].id, label: 'Дані замовлення' },
            { from: systemActivities[6].id, to: customerActivities[4].id, label: 'Сповіщення про доставку' }
        ];

        messageFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.label)}" style="endArrow=classic;html=1;rounded=0;dashed=1;dashPattern=5 5;strokeColor=#666666;fontSize=9;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Intermediate events
        const timeEvent = {
            id: this.generateId(),
            x: 720, y: 450,
            text: 'Очікування\\n24 години'
        };

        content += `        <mxCell id="${timeEvent.id}" value="${this.escapeXmlAttribute(timeEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=9;" vertex="1" parent="${systemPool.id}">
          <mxGeometry x="670" y="180" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        // Error handling
        const errorEvent = {
            id: this.generateId(),
            x: 420, y: 450,
            text: 'Помилка\\nоплати'
        };

        content += `        <mxCell id="${errorEvent.id}" value="${this.escapeXmlAttribute(errorEvent.text)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=9;" vertex="1" parent="${systemPool.id}">
          <mxGeometry x="370" y="180" width="60" height="60" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    // 7. ER - Розширена діаграма сутність-зв'язок (Enhanced Entity-Relationship Diagram)
        this.cellCounter = 1;
        let content = '';

        // Users Entity
        const usersId = this.generateId();
        content += `        <mxCell id="${usersId}" value="Users" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="200" height="208" as="geometry"/>
        </mxCell>
`;
        
        const userFields = [
            'id (PK, INT)',
            'name (VARCHAR)',
            'email (VARCHAR, UNIQUE)',
            'password (VARCHAR)',
            'is_admin (BOOLEAN)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        userFields.forEach((field, index) => {
            const style = field.includes('PK') ? 'fontStyle=4;' : '';
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(field)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}" vertex="1" parent="${usersId}">
          <mxGeometry y="${26 + index * 26}" width="200" height="26" as="geometry"/>
        </mxCell>
`;
        });

        // Categories Entity
        const categoriesId = this.generateId();
        content += `        <mxCell id="${categoriesId}" value="Categories" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="300" y="50" width="200" height="234" as="geometry"/>
        </mxCell>
`;

        const categoryFields = [
            'id (PK, INT)',
            'name_uk (VARCHAR)',
            'name_en (VARCHAR)',
            'slug (VARCHAR, UNIQUE)',
            'description_uk (TEXT)',
            'description_en (TEXT)',
            'is_active (BOOLEAN)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        categoryFields.forEach((field, index) => {
            const style = field.includes('PK') ? 'fontStyle=4;' : '';
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(field)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}" vertex="1" parent="${categoriesId}">
          <mxGeometry y="${26 + index * 26}" width="200" height="26" as="geometry"/>
        </mxCell>
`;
        });

        // Products Entity
        const productsId = this.generateId();
        content += `        <mxCell id="${productsId}" value="Products" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#ffe6cc;strokeColor=#d79b00;" vertex="1" parent="1">
          <mxGeometry x="550" y="50" width="220" height="364" as="geometry"/>
        </mxCell>
`;

        const productFields = [
            'id (PK, INT)',
            'category_id (FK → Categories.id)',
            'name_uk (VARCHAR)',
            'name_en (VARCHAR)',
            'slug (VARCHAR, UNIQUE)',
            'description_uk (TEXT)',
            'description_en (TEXT)',
            'price (DECIMAL)',
            'sale_price (DECIMAL)',
            'stock_quantity (INT)',
            'sku (VARCHAR)',
            'is_active (BOOLEAN)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        productFields.forEach((field, index) => {
            let style = '';
            if (field.includes('PK')) style = 'fontStyle=4;';
            else if (field.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(field)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}" vertex="1" parent="${productsId}">
          <mxGeometry y="${26 + index * 26}" width="220" height="26" as="geometry"/>
        </mxCell>
`;
        });

        // Orders Entity
        const ordersId = this.generateId();
        content += `        <mxCell id="${ordersId}" value="Orders" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="50" y="300" width="200" height="286" as="geometry"/>
        </mxCell>
`;

        const orderFields = [
            'id (PK, INT)',
            'user_id (FK → Users.id)',
            'status (ENUM)',
            'total_amount (DECIMAL)',
            'shipping_address (TEXT)',
            'billing_address (TEXT)',
            'payment_method (VARCHAR)',
            'payment_status (ENUM)',
            'notes (TEXT)',
            'created_at (TIMESTAMP)',
            'updated_at (TIMESTAMP)'
        ];

        orderFields.forEach((field, index) => {
            let style = '';
            if (field.includes('PK')) style = 'fontStyle=4;';
            else if (field.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(field)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}" vertex="1" parent="${ordersId}">
          <mxGeometry y="${26 + index * 26}" width="200" height="26" as="geometry"/>
        </mxCell>
`;
        });

        // Order Items Entity
        const orderItemsId = this.generateId();
        content += `        <mxCell id="${orderItemsId}" value="Order_Items" style="swimlane;fontStyle=1;childLayout=stackLayout;horizontal=1;startSize=26;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
          <mxGeometry x="300" y="350" width="200" height="182" as="geometry"/>
        </mxCell>
`;

        const orderItemFields = [
            'id (PK, INT)',
            'order_id (FK → Orders.id)',
            'product_id (FK → Products.id)',
            'quantity (INT)',
            'unit_price (DECIMAL)',
            'total_price (DECIMAL)',
            'created_at (TIMESTAMP)'
        ];

        orderItemFields.forEach((field, index) => {
            let style = '';
            if (field.includes('PK')) style = 'fontStyle=4;';
            else if (field.includes('FK')) style = 'fontStyle=2;';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(field)}" style="text;strokeColor=none;fillColor=none;align=left;verticalAlign=top;spacingLeft=4;spacingRight=4;overflow=hidden;rotatable=0;points=[[0,0.5],[1,0.5]];portConstraint=eastwest;${style}" vertex="1" parent="${orderItemsId}">
          <mxGeometry y="${26 + index * 26}" width="200" height="26" as="geometry"/>
        </mxCell>
`;
        });

        // Relationships with proper cardinality
        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="${categoriesId}" target="${productsId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="167" as="sourcePoint"/>
            <mxPoint x="550" y="167" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="152" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="530" y="152" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${usersId}" target="${ordersId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="150" y="260" as="sourcePoint"/>
            <mxPoint x="150" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="130" y="260" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="130" y="280" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${ordersId}" target="${orderItemsId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="250" y="440" as="sourcePoint"/>
            <mxPoint x="300" y="440" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="250" y="425" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="280" y="425" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=none;html=1;rounded=0;" edge="1" parent="1" source="${orderItemsId}" target="${productsId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="500" y="380" as="sourcePoint"/>
            <mxPoint x="550" y="300" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="${this.generateId()}" value="M" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="365" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="1" style="text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;" vertex="1" parent="1">
          <mxGeometry x="530" y="300" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    // 8. Activity - Діаграма діяльності (Activity Diagram)
    createActivityDiagram() {
        this.cellCounter = 1;
        let activityContent = '';

        // Start node
        const startNode = { id: this.generateId(), x: 400, y: 50 };
        activityContent += `        <mxCell id="${startNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${startNode.x}" y="${startNode.y}" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Activities
        const activities = [
            { id: this.generateId(), x: 300, y: 120, text: 'Вхід на сайт\\nелектронного магазину' },
            { id: this.generateId(), x: 300, y: 200, text: 'Перегляд каталогу\\nтоварів' },
            { id: this.generateId(), x: 300, y: 280, text: 'Вибір товару' },
            { id: this.generateId(), x: 300, y: 360, text: 'Перегляд деталей\\nтовару' },
            { id: this.generateId(), x: 500, y: 360, text: 'Додавання\\nв кошик' },
            { id: this.generateId(), x: 500, y: 440, text: 'Перегляд\\nкошика' },
            { id: this.generateId(), x: 500, y: 520, text: 'Заповнення\\nінформації\\nпро доставку' },
            { id: this.generateId(), x: 300, y: 600, text: 'Вибір способу\\nоплати' },
            { id: this.generateId(), x: 300, y: 680, text: 'Підтвердження\\nзамовлення' },
            { id: this.generateId(), x: 300, y: 760, text: 'Отримання\\nпідтвердження' }
        ];

        activities.forEach(activity => {
            activityContent += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${activity.x}" y="${activity.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Decision nodes
        const decisions = [
            { id: this.generateId(), x: 485, y: 270, text: 'Авторизований?' },
            { id: this.generateId(), x: 385, y: 590, text: 'Оплата\\nуспішна?' }
        ];

        decisions.forEach(decision => {
            activityContent += `        <mxCell id="${decision.id}" value="${this.escapeXmlAttribute(decision.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${decision.x}" y="${decision.y}" width="80" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Fork and Join nodes
        const forkNode = { id: this.generateId(), x: 400, y: 440 };
        const joinNode = { id: this.generateId(), x: 400, y: 520 };

        [forkNode, joinNode].forEach(node => {
            activityContent += `        <mxCell id="${node.id}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${node.x}" y="${node.y}" width="80" height="8" as="geometry"/>
        </mxCell>
`;
        });

        // Registration activity
        const registerActivity = { id: this.generateId(), x: 650, y: 280, text: 'Реєстрація\\nкористувача' };
        activityContent += `        <mxCell id="${registerActivity.id}" value="${this.escapeXmlAttribute(registerActivity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="${registerActivity.x}" y="${registerActivity.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;

        // End node
        const endNode = { id: this.generateId(), x: 400, y: 850 };
        activityContent += `        <mxCell id="${endNode.id}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${endNode.x}" y="${endNode.y}" width="30" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="${this.generateId()}" value="" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${endNode.x + 5}" y="${endNode.y + 5}" width="20" height="20" as="geometry"/>
        </mxCell>
`;

        // Flows
        const flows = [
            { from: startNode.id, to: activities[0].id },
            { from: activities[0].id, to: activities[1].id },
            { from: activities[1].id, to: activities[2].id },
            { from: activities[2].id, to: activities[3].id },
            { from: activities[3].id, to: decisions[0].id },
            { from: decisions[0].id, to: activities[4].id, label: 'Так' },
            { from: decisions[0].id, to: registerActivity.id, label: 'Ні' },
            { from: registerActivity.id, to: activities[4].id },
            { from: activities[4].id, to: activities[5].id },
            { from: activities[5].id, to: activities[6].id },
            { from: activities[6].id, to: activities[7].id },
            { from: activities[7].id, to: decisions[1].id },
            { from: decisions[1].id, to: activities[8].id, label: 'Так' },
            { from: activities[8].id, to: activities[9].id },
            { from: activities[9].id, to: endNode.id },
            { from: decisions[1].id, to: activities[7].id, label: 'Ні' }
        ];

        flows.forEach(flow => {
            const label = flow.label ? this.escapeXmlAttribute(flow.label) : '';
            activityContent += `        <mxCell id="${this.generateId()}" value="${label}" style="endArrow=classic;html=1;rounded=0;fontSize=10;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return activityContent;
    }

    // 9. Sequence - Діаграма послідовності (Sequence Diagram)
    createSequenceDiagram() {
        this.cellCounter = 1;
        let sequenceContent = '';

        // Actors and objects
        const participants = [
            { id: this.generateId(), x: 100, y: 50, text: 'Клієнт' },
            { id: this.generateId(), x: 250, y: 50, text: 'Веб-інтерфейс' },
            { id: this.generateId(), x: 400, y: 50, text: 'Контролер' },
            { id: this.generateId(), x: 550, y: 50, text: 'База даних' },
            { id: this.generateId(), x: 700, y: 50, text: 'Платіжний\\nсервіс' }
        ];

        participants.forEach(participant => {
            sequenceContent += `        <mxCell id="${participant.id}" value="${this.escapeXmlAttribute(participant.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="${participant.x}" y="${participant.y}" width="100" height="50" as="geometry"/>
        </mxCell>
`;

            // Lifelines
            const lifelineId = this.generateId();
            sequenceContent += `        <mxCell id="${lifelineId}" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=2;" edge="1" parent="1" source="${participant.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${participant.x + 50}" y="100" as="sourcePoint"/>
            <mxPoint x="${participant.x + 50}" y="800" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Messages between participants
        const messages = [
            { from: 0, to: 1, y: 150, text: '1: відкрити каталог товарів' },
            { from: 1, to: 2, y: 180, text: '2: запит каталогу' },
            { from: 2, to: 3, y: 210, text: '3: отримати товари' },
            { from: 3, to: 2, y: 240, text: '4: список товарів' },
            { from: 2, to: 1, y: 270, text: '5: відображення товарів' },
            { from: 1, to: 0, y: 300, text: '6: каталог товарів' },
            { from: 0, to: 1, y: 350, text: '7: вибрати товар' },
            { from: 1, to: 2, y: 380, text: '8: додати в кошик' },
            { from: 2, to: 3, y: 410, text: '9: зберегти в кошик' },
            { from: 3, to: 2, y: 440, text: '10: підтвердження' },
            { from: 2, to: 1, y: 470, text: '11: товар додано' },
            { from: 1, to: 0, y: 500, text: '12: успішне додавання' },
            { from: 0, to: 1, y: 550, text: '13: оформити замовлення' },
            { from: 1, to: 2, y: 580, text: '14: створити замовлення' },
            { from: 2, to: 3, y: 610, text: '15: зберегти замовлення' },
            { from: 2, to: 4, y: 640, text: '16: ініціювати платіж' },
            { from: 4, to: 2, y: 670, text: '17: результат платежу' },
            { from: 3, to: 2, y: 700, text: '18: оновити статус' },
            { from: 2, to: 1, y: 730, text: '19: підтвердження замовлення' },
            { from: 1, to: 0, y: 760, text: '20: замовлення створено' }
        ];

        messages.forEach(message => {
            const fromX = participants[message.from].x + 50;
            const toX = participants[message.to].x + 50;
            const isReturn = message.text.includes('список') || message.text.includes('підтвердження') || 
                           message.text.includes('результат') || message.text.includes('товар додано') ||
                           message.text.includes('каталог') || message.text.includes('успішне') ||
                           message.text.includes('замовлення створено');

            const arrowStyle = isReturn ? 'endArrow=open;dashed=1;html=1;strokeWidth=2;' : 'endArrow=classic;html=1;strokeWidth=2;';
            
            sequenceContent += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(message.text)}" style="${arrowStyle}fontSize=10;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${fromX}" y="${message.y}" as="sourcePoint"/>
            <mxPoint x="${toX}" y="${message.y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Activation boxes
        const activations = [
            { participant: 1, y: 170, height: 140 }, // Web interface
            { participant: 2, y: 200, height: 540 }, // Controller
            { participant: 3, y: 230, height: 480 }, // Database
            { participant: 4, y: 640, height: 40 }   // Payment service
        ];

        activations.forEach(activation => {
            const x = participants[activation.participant].x + 45;
            sequenceContent += `        <mxCell id="${this.generateId()}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${activation.y}" width="10" height="${activation.height}" as="geometry"/>
        </mxCell>
`;
        });

        return sequenceContent;
    }
    createSequenceDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Participants
        const participants = [
            { id: this.generateId(), name: 'Користувач', x: 80 },
            { id: this.generateId(), name: 'Веб-браузер', x: 230 },
            { id: this.generateId(), name: 'CartController', x: 380 },
            { id: this.generateId(), name: 'Product Model', x: 530 },
            { id: this.generateId(), name: 'База даних', x: 680 }
        ];

        participants.forEach(p => {
            content += `        <mxCell id="${p.id}" value="${this.escapeXmlAttribute(p.name)}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="${p.x}" y="80" width="100" height="600" as="geometry"/>
        </mxCell>
`;
        });

        // Messages
        const messages = [
            { from: 0, to: 1, y: 150, text: 'Натискає "Додати в кошик"' },
            { from: 1, to: 2, y: 200, text: 'POST /cart/add' },
            { from: 2, to: 2, y: 230, text: 'Валідація запиту' },
            { from: 2, to: 3, y: 260, text: 'findOrFail(product_id)' },
            { from: 3, to: 4, y: 290, text: 'SELECT * FROM products' },
            { from: 4, to: 3, y: 320, text: 'Дані про товар' },
            { from: 3, to: 2, y: 350, text: 'Об\'єкт Product' },
            { from: 2, to: 3, y: 380, text: 'Перевірка наявності' },
            { from: 2, to: 1, y: 450, text: 'JSON response' },
            { from: 1, to: 0, y: 480, text: 'Оновлення UI' }
        ];

        messages.forEach(msg => {
            const fromX = participants[msg.from].x + 50;
            const toX = participants[msg.to].x + 50;
            const isReturn = msg.text.includes('Дані') || msg.text.includes('Об\'єкт') || msg.text.includes('response');
            const arrowStyle = isReturn ? 'dashed=1;dashPattern=1 3;' : '';
            
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(msg.text)}" style="html=1;verticalAlign=bottom;endArrow=block;rounded=0;${arrowStyle}" edge="1" parent="1">
          <mxGeometry width="80" relative="1" as="geometry">
            <mxPoint x="${fromX}" y="${msg.y}" as="sourcePoint"/>
            <mxPoint x="${toX}" y="${msg.y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Add activation boxes
        participants.slice(1).forEach((p, index) => {
            content += `        <mxCell id="${this.generateId()}" value="" style="html=1;points=[];perimeter=orthogonalPerimeter;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="${p.id}">
          <mxGeometry x="45" y="${120 + index * 50}" width="10" height="300" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Enhanced BPMN Diagram
    createBPMNDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Start event
        const startId = this.generateId();
        content += `        <mxCell id="${startId}" value="${this.escapeXmlAttribute('Початок\\nзамовлення')}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="180" width="80" height="60" as="geometry"/>
        </mxCell>
`;

        // User lane
        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('Користувач')}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=20;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="30" y="120" width="1000" height="120" as="geometry"/>
        </mxCell>
`;

        // System lane
        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('Система ТехноСвіт')}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=20;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="30" y="240" width="1000" height="140" as="geometry"/>
        </mxCell>
`;

        // Payment lane
        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('Платіжна система')}" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=20;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="30" y="380" width="1000" height="100" as="geometry"/>
        </mxCell>
`;

        // User tasks
        const userTasks = [
            { id: this.generateId(), x: 180, y: 160, text: 'Додавання\\nтоварів в кошик' },
            { id: this.generateId(), x: 320, y: 160, text: 'Заповнення\\nданих замовлення' }
        ];

        userTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="${task.x}" y="${task.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // System tasks and gateways
        const systemElements = [
            { id: this.generateId(), x: 460, y: 280, text: 'Перевірка\\nналичности\\nтоварів', type: 'task' },
            { id: this.generateId(), x: 600, y: 280, text: 'Товари\\nв наличності?', type: 'gateway' },
            { id: this.generateId(), x: 740, y: 280, text: 'Розрахунок\\nвартості\\nзамовлення', type: 'task' },
            { id: this.generateId(), x: 880, y: 280, text: 'Створення\\nзамовлення\\nв БД', type: 'task' },
            { id: this.generateId(), x: 600, y: 200, text: 'Повідомлення\\nпро відсутність\\nтоварів', type: 'error' }
        ];

        systemElements.forEach(element => {
            let style = '';
            if (element.type === 'task') {
                style = 'rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;';
            } else if (element.type === 'gateway') {
                style = 'rhombus;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;';
            } else if (element.type === 'error') {
                style = 'rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;';
            }
            
            content += `        <mxCell id="${element.id}" value="${this.escapeXmlAttribute(element.text)}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${element.x}" y="${element.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Payment system tasks
        const paymentTasks = [
            { id: this.generateId(), x: 460, y: 410, text: 'Обробка\\nплатежу' },
            { id: this.generateId(), x: 600, y: 410, text: 'Підтвердження\\nоплати' }
        ];

        paymentTasks.forEach(task => {
            content += `        <mxCell id="${task.id}" value="${this.escapeXmlAttribute(task.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="${task.x}" y="${task.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Final elements
        const endElements = [
            { id: this.generateId(), x: 800, y: 160, text: 'Email\\nпідтвердження' },
            { id: this.generateId(), x: 940, y: 180, text: 'Завершення\\nзамовлення' }
        ];

        endElements.forEach(element => {
            const style = element.text.includes('Завершення') ? 
                'ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontStyle=1;' :
                'rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;';
            
            content += `        <mxCell id="${element.id}" value="${this.escapeXmlAttribute(element.text)}" style="${style}" vertex="1" parent="1">
          <mxGeometry x="${element.x}" y="${element.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Flow connections with labels
        const flows = [
            { from: startId, to: userTasks[0].id, label: '' },
            { from: userTasks[0].id, to: userTasks[1].id, label: '' },
            { from: userTasks[1].id, to: systemElements[0].id, label: 'Підтвердження\\nзамовлення' },
            { from: systemElements[0].id, to: systemElements[1].id, label: '' },
            { from: systemElements[1].id, to: systemElements[2].id, label: 'Так' },
            { from: systemElements[1].id, to: systemElements[4].id, label: 'Ні' },
            { from: systemElements[2].id, to: paymentTasks[0].id, label: '' },
            { from: paymentTasks[0].id, to: paymentTasks[1].id, label: '' },
            { from: paymentTasks[1].id, to: systemElements[3].id, label: '' },
            { from: systemElements[3].id, to: endElements[0].id, label: '' },
            { from: endElements[0].id, to: endElements[1].id, label: '' }
        ];

        flows.forEach(flow => {
            const labelValue = flow.label ? this.escapeXmlAttribute(flow.label) : '';
            content += `        <mxCell id="${this.generateId()}" value="${labelValue}" style="endArrow=classic;html=1;rounded=0;strokeWidth=2;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Message flows
        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('Перенаправлення\\nна платіж')}" style="endArrow=classic;html=1;rounded=0;dashed=1;dashPattern=5 5;strokeColor=#666666;" edge="1" parent="1" source="${userTasks[1].id}" target="${paymentTasks[0].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('Сповіщення\\nкористувача')}" style="endArrow=classic;html=1;rounded=0;dashed=1;dashPattern=5 5;strokeColor=#666666;" edge="1" parent="1" source="${endElements[0].id}" target="${userTasks[1].id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    // Enhanced DFD Diagram - Detailed context diagram
    createDFDDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Central process
        const centralId = this.generateId();
        content += `        <mxCell id="${centralId}" value="${this.escapeXmlAttribute('0\\nСистема\\nелектронного\\nмагазину\\nТехноСвіт')}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="300" width="160" height="120" as="geometry"/>
        </mxCell>
`;

        // External entities
        const entities = [
            { id: this.generateId(), x: 80, y: 100, text: 'Незареєстрований\\nвідвідувач' },
            { id: this.generateId(), x: 80, y: 250, text: 'Зареєстрований\\nклієнт' },
            { id: this.generateId(), x: 80, y: 400, text: 'Адміністратор' },
            { id: this.generateId(), x: 80, y: 550, text: 'Постачальник' },
            { id: this.generateId(), x: 720, y: 100, text: 'Платіжна\\nсистема' },
            { id: this.generateId(), x: 720, y: 250, text: 'Email\\nсервіс' },
            { id: this.generateId(), x: 720, y: 400, text: 'Аналітична\\nсистема' },
            { id: this.generateId(), x: 720, y: 550, text: 'Служба\\nдоставки' }
        ];

        entities.forEach(entity => {
            content += `        <mxCell id="${entity.id}" value="${this.escapeXmlAttribute(entity.text)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${entity.x}" y="${entity.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Data stores
        const dataStores = [
            { id: this.generateId(), x: 200, y: 650, text: 'D1\\nКористувачі' },
            { id: this.generateId(), x: 340, y: 650, text: 'D2\\nТовари' },
            { id: this.generateId(), x: 480, y: 650, text: 'D3\\nКатегорії' },
            { id: this.generateId(), x: 620, y: 650, text: 'D4\\nЗамовлення' },
            { id: this.generateId(), x: 200, y: 50, text: 'D5\\nКошики' },
            { id: this.generateId(), x: 340, y: 50, text: 'D6\\nСесії' },
            { id: this.generateId(), x: 480, y: 50, text: 'D7\\nЛоги' },
            { id: this.generateId(), x: 620, y: 50, text: 'D8\\nНалаштування' }
        ];

        dataStores.forEach(store => {
            content += `        <mxCell id="${store.id}" value="${this.escapeXmlAttribute(store.text)}" style="shape=partialRectangle;whiteSpace=wrap;html=1;left=0;right=0;fillColor=#f5f5f5;strokeColor=#666666;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${store.x}" y="${store.y}" width="100" height="40" as="geometry"/>
        </mxCell>
`;
        });

        // Data flows from external entities to system
        const inFlows = [
            { from: entities[0].id, to: centralId, text: 'Запити каталогу', pos: 'top' },
            { from: entities[1].id, to: centralId, text: 'Замовлення\\nіторія покупок', pos: 'left' },
            { from: entities[2].id, to: centralId, text: 'Управління\\nтоварами/користувачами', pos: 'left' },
            { from: entities[3].id, to: centralId, text: 'Оновлення\\nтоварів', pos: 'bottom' }
        ];

        inFlows.forEach((flow, index) => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Data flows from system to external entities
        const outFlows = [
            { from: centralId, to: entities[0].id, text: 'Каталог товарів\\nпошукові результати' },
            { from: centralId, to: entities[1].id, text: 'Підтвердження\\nзамовлень, статуси' },
            { from: centralId, to: entities[2].id, text: 'Звіти, статистика\\nуправління даними' },
            { from: centralId, to: entities[4].id, text: 'Запити оплати' },
            { from: centralId, to: entities[5].id, text: 'Email сповіщення' },
            { from: centralId, to: entities[6].id, text: 'Дані для аналітики' },
            { from: centralId, to: entities[7].id, text: 'Замовлення\\nдля доставки' }
        ];

        outFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Data flows from external entities back to system
        const returnFlows = [
            { from: entities[4].id, to: centralId, text: 'Результати\\nоплати' },
            { from: entities[5].id, to: centralId, text: 'Статуси\\nдоставки email' },
            { from: entities[6].id, to: centralId, text: 'Аналітичні\\nзвіти' },
            { from: entities[7].id, to: centralId, text: 'Статуси\\nдоставки' }
        ];

        returnFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=9;dashed=1;dashPattern=3 3;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Data flows between system and data stores
        const dbFlows = [
            { from: centralId, to: dataStores[0].id, text: 'Дані\\nкористувачів' },
            { from: centralId, to: dataStores[1].id, text: 'Дані\\nтоварів' },
            { from: centralId, to: dataStores[2].id, text: 'Дані\\nкатегорій' },
            { from: centralId, to: dataStores[3].id, text: 'Дані\\nзамовлень' },
            { from: centralId, to: dataStores[4].id, text: 'Дані\\nкошиків' },
            { from: centralId, to: dataStores[5].id, text: 'Сесійні\\nдані' },
            { from: centralId, to: dataStores[6].id, text: 'Журнал\\nподій' },
            { from: centralId, to: dataStores[7].id, text: 'Конфігурація\\nсистеми' }
        ];

        dbFlows.forEach(flow => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(flow.text)}" style="endArrow=classic;startArrow=classic;html=1;rounded=0;fontSize=8;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Enhanced SADT Diagram - Detailed A-0 context
    createSADTDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Main SADT box
        const mainBoxId = this.generateId();
        content += `        <mxCell id="${mainBoxId}" value="${this.escapeXmlAttribute('Система управління\\nелектронним магазином\\nТехноСвіт\\n\\nA-0')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=14;fontStyle=1;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="300" y="250" width="280" height="140" as="geometry"/>
        </mxCell>
`;

        // Input arrows (left side)
        const inputs = [
            { text: 'Запити клієнтів\\n(каталог, пошук)', y: 270 },
            { text: 'Замовлення\\nвід клієнтів', y: 300 },
            { text: 'Дані про товари\\nвід постачальників', y: 330 },
            { text: 'Команди\\nадміністратора', y: 360 }
        ];

        inputs.forEach((input, index) => {
            const arrowId = this.generateId();
            content += `        <mxCell id="${arrowId}" value="${this.escapeXmlAttribute(input.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;" edge="1" parent="1" target="${mainBoxId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="50" y="${input.y}" as="sourcePoint"/>
            <mxPoint x="300" y="${input.y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Control arrows (top side)
        const controls = [
            { text: 'Бізнес-правила\\nе-комерції', x: 350 },
            { text: 'Політика\\nбезпеки', x: 420 },
            { text: 'Стандарти\\nwebе-розробки', x: 490 }
        ];

        controls.forEach(control => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(control.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;" edge="1" parent="1" target="${mainBoxId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${control.x}" y="100" as="sourcePoint"/>
            <mxPoint x="${control.x}" y="250" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Output arrows (right side)
        const outputs = [
            { text: 'Каталог товарів\\nз цінами', y: 270 },
            { text: 'Підтверджені\\nзамовлення', y: 300 },
            { text: 'Звіти та\\nстатистика', y: 330 },
            { text: 'Сповіщення\\nклієнтам', y: 360 }
        ];

        outputs.forEach(output => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(output.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;" edge="1" parent="1" source="${mainBoxId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="580" y="${output.y}" as="sourcePoint"/>
            <mxPoint x="750" y="${output.y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Mechanism arrows (bottom side)
        const mechanisms = [
            { text: 'Laravel\\nFramework', x: 350 },
            { text: 'MySQL\\nБаза даних', x: 420 },
            { text: 'Apache/Nginx\\nWeb сервер', x: 490 }
        ];

        mechanisms.forEach(mechanism => {
            content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute(mechanism.text)}" style="endArrow=classic;html=1;rounded=0;fontSize=10;" edge="1" parent="1" target="${mainBoxId}">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${mechanism.x}" y="500" as="sourcePoint"/>
            <mxPoint x="${mechanism.x}" y="390" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
`;
        });

        // Additional detail elements
        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('ПРИЗНАЧЕННЯ: Автоматизація\\nпроцесів продажу товарів\\nв інтернет-магазині')}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=9;" vertex="1" parent="1">
          <mxGeometry x="50" y="450" width="200" height="60" as="geometry"/>
        </mxCell>
`;

        content += `        <mxCell id="${this.generateId()}" value="${this.escapeXmlAttribute('ТОЧКА ЗОРУ:\\nМенеджмент компанії\\nТехноСвіт')}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=9;" vertex="1" parent="1">
          <mxGeometry x="550" y="450" width="150" height="60" as="geometry"/>
        </mxCell>
`;

        return content;
    }

    // Enhanced Architecture Diagram - Layered architecture with technologies
    createArchitectureDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Presentation Layer
        const presentationLayerId = this.generateId();
        content += `        <mxCell id="${presentationLayerId}" value="${this.escapeXmlAttribute('Рівень представлення\\n(Presentation Layer)')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="700" height="40" as="geometry"/>
        </mxCell>
`;

        // Frontend components
        const frontendComponents = [
            { id: this.generateId(), x: 70, y: 110, text: 'Blade\\nTemplates', tech: 'Laravel' },
            { id: this.generateId(), x: 180, y: 110, text: 'Vue.js\\nComponents', tech: 'JavaScript' },
            { id: this.generateId(), x: 290, y: 110, text: 'CSS/SCSS\\nStyles', tech: 'Styling' },
            { id: this.generateId(), x: 400, y: 110, text: 'JavaScript\\nScripts', tech: 'Frontend Logic' },
            { id: this.generateId(), x: 510, y: 110, text: 'Bootstrap\\nFramework', tech: 'UI' },
            { id: this.generateId(), x: 620, y: 110, text: 'AJAX\\nRequests', tech: 'Communication' }
        ];

        frontendComponents.forEach(comp => {
            content += `        <mxCell id="${comp.id}" value="${this.escapeXmlAttribute(comp.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${comp.x}" y="${comp.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Application Layer
        const applicationLayerId = this.generateId();
        content += `        <mxCell id="${applicationLayerId}" value="${this.escapeXmlAttribute('Прикладний рівень\\n(Application Layer)')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="200" width="700" height="40" as="geometry"/>
        </mxCell>
`;

        // Controllers and middleware
        const applicationComponents = [
            { id: this.generateId(), x: 70, y: 260, text: 'Product\\nController', tech: 'Laravel' },
            { id: this.generateId(), x: 180, y: 260, text: 'User\\nController', tech: 'Laravel' },
            { id: this.generateId(), x: 290, y: 260, text: 'Order\\nController', tech: 'Laravel' },
            { id: this.generateId(), x: 400, y: 260, text: 'Auth\\nMiddleware', tech: 'Security' },
            { id: this.generateId(), x: 510, y: 260, text: 'Validation\\nRules', tech: 'Data Integrity' },
            { id: this.generateId(), x: 620, y: 260, text: 'API\\nRoutes', tech: 'Routing' }
        ];

        applicationComponents.forEach(comp => {
            content += `        <mxCell id="${comp.id}" value="${this.escapeXmlAttribute(comp.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${comp.x}" y="${comp.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Business Logic Layer
        const businessLayerId = this.generateId();
        content += `        <mxCell id="${businessLayerId}" value="${this.escapeXmlAttribute('Рівень бізнес-логіки\\n(Business Logic Layer)')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="350" width="700" height="40" as="geometry"/>
        </mxCell>
`;

        // Business components
        const businessComponents = [
            { id: this.generateId(), x: 70, y: 410, text: 'Product\\nService', tech: 'Business Logic' },
            { id: this.generateId(), x: 180, y: 410, text: 'Order\\nProcessing', tech: 'Business Logic' },
            { id: this.generateId(), x: 290, y: 410, text: 'Payment\\nService', tech: 'Business Logic' },
            { id: this.generateId(), x: 400, y: 410, text: 'Inventory\\nManagement', tech: 'Business Logic' },
            { id: this.generateId(), x: 510, y: 410, text: 'Cart\\nService', tech: 'Business Logic' },
            { id: this.generateId(), x: 620, y: 410, text: 'Notification\\nService', tech: 'Business Logic' }
        ];

        businessComponents.forEach(comp => {
            content += `        <mxCell id="${comp.id}" value="${this.escapeXmlAttribute(comp.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${comp.x}" y="${comp.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Data Access Layer
        const dataLayerId = this.generateId();
        content += `        <mxCell id="${dataLayerId}" value="${this.escapeXmlAttribute('Рівень доступу до даних\\n(Data Access Layer)')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="500" width="700" height="40" as="geometry"/>
        </mxCell>
`;

        // Data access components
        const dataComponents = [
            { id: this.generateId(), x: 70, y: 560, text: 'Eloquent\\nORM', tech: 'Laravel' },
            { id: this.generateId(), x: 180, y: 560, text: 'Migration\\nFiles', tech: 'Schema' },
            { id: this.generateId(), x: 290, y: 560, text: 'Model\\nClasses', tech: 'Data Models' },
            { id: this.generateId(), x: 400, y: 560, text: 'Database\\nSeeding', tech: 'Data Population' },
            { id: this.generateId(), x: 510, y: 560, text: 'Query\\nBuilder', tech: 'Data Access' },
            { id: this.generateId(), x: 620, y: 560, text: 'Repository\\nPattern', tech: 'Data Abstraction' }
        ];

        dataComponents.forEach(comp => {
            content += `        <mxCell id="${comp.id}" value="${this.escapeXmlAttribute(comp.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${comp.x}" y="${comp.y}" width="80" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Database Layer
        const databaseLayerId = this.generateId();
        content += `        <mxCell id="${databaseLayerId}" value="${this.escapeXmlAttribute('Рівень даних\\n(Database Layer)')}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=#d79b00;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="650" width="700" height="40" as="geometry"/>
        </mxCell>
`;

        // Database components
        const dbComponents = [
            { id: this.generateId(), x: 150, y: 710, text: 'MySQL\\nDatabase', tech: 'Primary DB' },
            { id: this.generateId(), x: 280, y: 710, text: 'Redis\\nCache', tech: 'Caching' },
            { id: this.generateId(), x: 410, y: 710, text: 'File\\nStorage', tech: 'Media Files' },
            { id: this.generateId(), x: 540, y: 710, text: 'Session\\nStorage', tech: 'User Sessions' }
        ];

        dbComponents.forEach(comp => {
            content += `        <mxCell id="${comp.id}" value="${this.escapeXmlAttribute(comp.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=#d79b00;fontSize=10;" vertex="1" parent="1">
          <mxGeometry x="${comp.x}" y="${comp.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Add connecting arrows between layers
        const layerConnections = [
            { from: presentationLayerId, to: applicationLayerId },
            { from: applicationLayerId, to: businessLayerId },
            { from: businessLayerId, to: dataLayerId },
            { from: dataLayerId, to: databaseLayerId }
        ];

        layerConnections.forEach(conn => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;startArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${conn.from}" target="${conn.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        // Add external systems
        const externalSystems = [
            { id: this.generateId(), x: 800, y: 150, text: 'Payment\\nGateway\\n(Stripe/PayPal)' },
            { id: this.generateId(), x: 800, y: 250, text: 'Email\\nService\\n(SMTP)' },
            { id: this.generateId(), x: 800, y: 350, text: 'File\\nStorage\\n(AWS S3)' },
            { id: this.generateId(), x: 800, y: 450, text: 'Analytics\\n(Google Analytics)' }
        ];

        externalSystems.forEach(sys => {
            content += `        <mxCell id="${sys.id}" value="${this.escapeXmlAttribute(sys.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontSize=10;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="${sys.x}" y="${sys.y}" width="100" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Connections to external systems
        externalSystems.forEach(sys => {
            content += `        <mxCell id="${this.generateId()}" value="" style="endArrow=classic;html=1;rounded=0;dashed=1;dashPattern=3 3;" edge="1" parent="1" source="${businessLayerId}" target="${sys.id}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Enhanced Activity Diagram
    createActivityDiagram() {
        this.cellCounter = 1;
        let content = '';

        // Start node
        const startId = this.generateId();
        content += `        <mxCell id="${startId}" value="" style="ellipse;html=1;shape=startState;fillColor=#000000;strokeColor=#ff0000;" vertex="1" parent="1">
          <mxGeometry x="385" y="30" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Activity nodes
        const activities = [
            { id: this.generateId(), x: 300, y: 100, text: 'Відкриття\\nголовної сторінки' },
            { id: this.generateId(), x: 300, y: 200, text: 'Перегляд\\nкаталогу товарів' },
            { id: this.generateId(), x: 300, y: 300, text: 'Пошук/фільтрація\\nтоварів' },
            { id: this.generateId(), x: 300, y: 400, text: 'Перегляд\\nдеталей товару' },
            { id: this.generateId(), x: 300, y: 500, text: 'Додавання\\nв кошик' },
            { id: this.generateId(), x: 500, y: 600, text: 'Реєстрація/\\nВхід в систему' },
            { id: this.generateId(), x: 300, y: 700, text: 'Перегляд\\nкошика' },
            { id: this.generateId(), x: 300, y: 800, text: 'Заповнення\\nданих замовлення' },
            { id: this.generateId(), x: 300, y: 900, text: 'Вибір способу\\nоплати' },
            { id: this.generateId(), x: 300, y: 1000, text: 'Підтвердження\\nзамовлення' },
            { id: this.generateId(), x: 300, y: 1100, text: 'Оплата\\nзамовлення' },
            { id: this.generateId(), x: 300, y: 1200, text: 'Отримання\\nпідтвердження' }
        ];

        activities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
          <mxGeometry x="${activity.x}" y="${activity.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Decision nodes
        const decisions = [
            { id: this.generateId(), x: 325, y: 580, text: 'Користувач\\nавторизований?' },
            { id: this.generateId(), x: 325, y: 1280, text: 'Оплата\\nуспішна?' }
        ];

        decisions.forEach(decision => {
            content += `        <mxCell id="${decision.id}" value="${this.escapeXmlAttribute(decision.text)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
          <mxGeometry x="${decision.x}" y="${decision.y}" width="100" height="80" as="geometry"/>
        </mxCell>
`;
        });

        // Fork and join nodes
        const forkId = this.generateId();
        content += `        <mxCell id="${forkId}" value="" style="line;html=1;strokeWidth=6;fillColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="320" y="1350" width="80" height="10" as="geometry"/>
        </mxCell>
`;

        // Parallel activities after successful payment
        const parallelActivities = [
            { id: this.generateId(), x: 150, y: 1400, text: 'Відправка email\\nпідтвердження' },
            { id: this.generateId(), x: 300, y: 1400, text: 'Оновлення\\nстатусу замовлення' },
            { id: this.generateId(), x: 450, y: 1400, text: 'Зменшення\\nкількості товарів' }
        ];

        parallelActivities.forEach(activity => {
            content += `        <mxCell id="${activity.id}" value="${this.escapeXmlAttribute(activity.text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
          <mxGeometry x="${activity.x}" y="${activity.y}" width="120" height="60" as="geometry"/>
        </mxCell>
`;
        });

        // Join node
        const joinId = this.generateId();
        content += `        <mxCell id="${joinId}" value="" style="line;html=1;strokeWidth=6;fillColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="320" y="1500" width="80" height="10" as="geometry"/>
        </mxCell>
`;

        // End node
        const endId = this.generateId();
        content += `        <mxCell id="${endId}" value="" style="ellipse;html=1;shape=endState;fillColor=#000000;strokeColor=#ff0000;" vertex="1" parent="1">
          <mxGeometry x="385" y="1550" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Error end node
        const errorEndId = this.generateId();
        content += `        <mxCell id="${errorEndId}" value="" style="ellipse;html=1;shape=endState;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
          <mxGeometry x="585" y="1330" width="30" height="30" as="geometry"/>
        </mxCell>
`;

        // Flow connections
        const flows = [
            { from: startId, to: activities[0].id },
            { from: activities[0].id, to: activities[1].id },
            { from: activities[1].id, to: activities[2].id },
            { from: activities[2].id, to: activities[3].id },
            { from: activities[3].id, to: activities[4].id },
            { from: activities[4].id, to: decisions[0].id },
            { from: decisions[0].id, to: activities[5].id, label: 'Ні' },
            { from: decisions[0].id, to: activities[6].id, label: 'Так' },
            { from: activities[5].id, to: activities[6].id },
            { from: activities[6].id, to: activities[7].id },
            { from: activities[7].id, to: activities[8].id },
            { from: activities[8].id, to: activities[9].id },
            { from: activities[9].id, to: activities[10].id },
            { from: activities[10].id, to: activities[11].id },
            { from: activities[11].id, to: decisions[1].id },
            { from: decisions[1].id, to: forkId, label: 'Так' },
            { from: decisions[1].id, to: errorEndId, label: 'Ні' },
            { from: forkId, to: parallelActivities[0].id },
            { from: forkId, to: parallelActivities[1].id },
            { from: forkId, to: parallelActivities[2].id },
            { from: parallelActivities[0].id, to: joinId },
            { from: parallelActivities[1].id, to: joinId },
            { from: parallelActivities[2].id, to: joinId },
            { from: joinId, to: endId }
        ];

        flows.forEach(flow => {
            const label = flow.label ? `value="${this.escapeXmlAttribute(flow.label)}"` : 'value=""';
            content += `        <mxCell id="${this.generateId()}" ${label} style="endArrow=classic;html=1;rounded=0;" edge="1" parent="1" source="${flow.from}" target="${flow.to}">
          <mxGeometry width="50" height="50" relative="1" as="geometry"/>
        </mxCell>
`;
        });

        return content;
    }

    // Generate complete diagrams
    generateAllDiagrams() {
        console.log('🔄 Recreating all diagrams with enhanced structure...');

        const diagrams = [
            {
                id: 'usecase',
                name: 'Use Case Diagram',
                content: this.createUseCaseDiagram()
            },
            {
                id: 'er',
                name: 'ER Diagram',
                content: this.createERDiagram()
            },
            {
                id: 'class',
                name: 'Class Diagram',
                content: this.createClassDiagram()
            },
            {
                id: 'sequence',
                name: 'Sequence Diagram',
                content: this.createSequenceDiagram()
            },
            {
                id: 'activity',
                name: 'Activity Diagram',
                content: this.createActivityDiagram()
            },
            {
                id: 'bpmn',
                name: 'BPMN Diagram',
                content: this.createBPMNDiagram()
            },
            {
                id: 'dfd',
                name: 'DFD Diagram',
                content: this.createDFDDiagram()
            },
            {
                id: 'sadt',
                name: 'SADT Diagram',
                content: this.createSADTDiagram()
            },
            {
                id: 'architecture',
                name: 'Architecture Diagram',
                content: this.createArchitectureDiagram()
            }
        ];

        // Add detailed diagrams instead of placeholders
        const detailedDiagrams = [
            { id: 'activity', name: 'Activity Diagram', content: this.createActivityDiagram() },
            { id: 'sadt', name: 'SADT Diagram', content: this.createSADTDiagram() },
            { id: 'architecture', name: 'Architecture Diagram', content: this.createArchitectureDiagram() }
        ];

        detailedDiagrams.forEach(diagram => {
            diagrams.push(diagram);
        });

        // Generate XML
        const drawioTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2025-07-08T12:30:00.000Z" agent="EnhancedDrawioGenerator" etag="kosyanchuk_v2" version="24.6.4" type="device" pages="${diagrams.length}">
{pages}
</mxfile>`;

        const pageTemplate = `  <diagram id="{id}" name="{name}">
    <mxGraphModel dx="1422" dy="827" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
{content}
      </root>
    </mxGraphModel>
  </diagram>`;

        const pagesXml = diagrams.map(diagram => 
            pageTemplate
                .replace('{id}', diagram.id)
                .replace('{name}', this.escapeXmlAttribute(diagram.name))
                .replace('{content}', diagram.content)
        ).join('\n');

        const finalXml = drawioTemplate.replace('{pages}', pagesXml);

        // Save to file
        const outputPath = path.join(__dirname, 'Kosyanchuk_Comprehensive_Diagrams.drawio');
        fs.writeFileSync(outputPath, finalXml, 'utf8');

        console.log(`✅ Comprehensive diagrams created: ${outputPath}`);
        console.log('📊 Generated diagrams:');
        console.log('🏗️  Структурно-функціональний аналіз:');
        diagrams.slice(0, 5).forEach((d, i) => {
            console.log(`   ${i + 1}. ${d.name}`);
        });
        console.log('🎯 Об\'єктно-орієнтований аналіз:');
        diagrams.slice(5).forEach((d, i) => {
            console.log(`   ${i + 6}. ${d.name}`);
        });

        return outputPath;
    }
}

// Execute the comprehensive generation
const generator = new ComprehensiveDiagramGenerator();
generator.generateAllDiagrams();
