<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/tstmt">
        <xsl:result-document href="Quran/index.html">
            <html>
                <head>
                    <meta charset="UTF-8"/>
                    <style>
                        div.a {
                        text-indent: 50px;
                        }
                    </style>
                </head>
                <body>
                    <h1>
                        <xsl:value-of select="coverpg/title"/>
                    </h1>
                    <h3>
                        <xsl:value-of select="coverpg/title2"/>
                    </h3>
                    <hr/>
                    <table width="100%">
                        <tr>
                            <td width="20%">
                                <ul style="list-style-type:none">
                                    <xsl:apply-templates select="suracoll/sura" mode="indice"/>
                                </ul>
                            </td>
                            <td width="80%" valign="top">
                                <p align="justify">
                                    <xsl:value-of select="coverpg/subtitle/p"/>
                                </p>
                                <hr/>
                                <h5>
                                    <xsl:value-of select="titlepg/subtitle/p"/>
                                </h5>
                                <h2>
                                    <xsl:value-of select="preface/ptitle"/>
                                </h2>
                                <p align="justify">
                                    <xsl:value-of select="preface/p"/>
                                </p>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="text()" mode="indice" priority="-1"/>
    
    <xsl:template match="suracoll/sura" mode="indice">
        <li>
            <a href="sura{count(preceding-sibling::*) + 1}.html">
                <xsl:value-of select="bktlong"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Páginas individuais -->
    
    <xsl:template match="sura">
        <xsl:result-document href="Quran/sura{count(preceding-sibling::*)+1}.html">
            <htm>
                <head>
                    <meta charset="UTF-8"/>
                </head>
                <body>
                    <h1><xsl:value-of select="bktlong"/></h1>
                    <h4><xsl:value-of select="bktshort"/></h4>
                    <hr/>
                    <b><xsl:value-of select="epigraph"/></b>
                    <p>
                        <xsl:apply-templates/>
                    </p>
                    <hr/>
                    <p>
                        [**<a href="index.html">Voltar ao Indice!</a>**]
                    </p>
                </body>
            </htm>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="bktlong"/>
    
    <xsl:template match="bktshort"/>
    
    <xsl:template match="epigraph"/>
    
    <xsl:template match="v">
        <p>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>
    
</xsl:stylesheet>
